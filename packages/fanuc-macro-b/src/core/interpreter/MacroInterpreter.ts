import { type IToken, tokenMatcher } from "chevrotain";
import Emittery from "emittery";

import { INTERPRETER } from "../../config";
import {
  AddressedValue,
  AddressInsight,
  InsightCollection,
  MacroVariable
} from "../../lib";
import { NcProgram } from "../../lib/NcProgram";
import { getChildren } from "../../utils/chevrotain";
import {
  getImage,
  parseImageAsInteger,
  parseNumber,
  unbox,
  unwrapComment
} from "../../utils/common";
import { Debuggers } from "../../utils/debug";
import { hasDwell, hasG10 } from "../../utils/flags";
import { MacroMemory } from "../MacroMemory";
import { MacroParser } from "../parser/MacroParser";
import {
  EqualTo,
  GreaterThan,
  GreaterThanOrEq,
  LessThan,
  LessThanOrEq,
  Modulus,
  NotEqualTo,
  Plus,
  Product
} from "../tokens";
import { BlockManager } from "./BlockManager";
import { STDLIB } from "./StandardLibrary";

import type {
  CST,
  IParsedLineData,
  IProgramNumberLine,
  MacroBuiltinFunctionNames,
  ValidG10OffsetGroups
} from "../../types";

const BaseCstVisitor = MacroParser.getBaseCstVisitor({
  useConstructorDefaults: INTERPRETER.USE_CONSTRUCTOR_WITH_DEFAULTS
});

/**
 * Macro Interpreter
 */
export class MacroInterpreter extends BaseCstVisitor {
  static EVENTS: {
    LINE: IParsedLineData;
    END_OF_PROGRAM: undefined;
  };

  #memory: MacroMemory;
  #blocks: BlockManager;
  #insights: InsightCollection;

  #looping = false;
  #lines: IParsedLineData[] = [];
  #debug = Debuggers.Interpreter;
  #events = new Emittery<typeof MacroInterpreter.EVENTS>();

  constructor() {
    super();
    this.#debug("initializing");
    this.validateVisitor();
    this.#debug("validation complete");
    this.#memory = new MacroMemory();
    this.#blocks = new BlockManager();
    this.#insights = new InsightCollection();
    this.#debug("ready");
  }

  /**
   * Get the interpreter's {@link MacroMemory}
   */
  get memory() {
    return this.#memory;
  }

  on = this.#events.on.bind(this.#events);
  onAny = this.#events.onAny.bind(this.#events);

  /**
   * Reset the Interpreter
   *
   * Clears lines and blocks, resets the {@link MacroMemory}
   */
  reset() {
    this.#lines = [];
    this.#blocks.reset();
    this.#memory.reset();
  }

  getRawLines() {
    return this.#lines;
  }

  getBlocks() {
    return this.#blocks;
  }

  getInsights(): InsightCollection {
    return this.#insights;
  }

  /**
   * Root Node for valid NC Programs
   */
  Program(ctx: CST.ProgramCstChildren): NcProgram {
    const { number, title } = this.ProgramNumberLine(
      getChildren(ctx.ProgramNumberLine)
    );
    const lines = getChildren(ctx.Lines);
    const parsedLines = this.Lines(lines);
    return NcProgram.create({ id: number, title, lines: parsedLines });
  }

  /**
   * Get the Program title and number
   */
  ProgramNumberLine(ctx: CST.ProgramNumberLineCstChildren): IProgramNumberLine {
    const token = unbox(ctx.ProgramNumber);
    const number = parseInt(token.payload as string);
    const line: IProgramNumberLine = { number, title: undefined };
    if (ctx?.Comment) {
      const image = getImage(ctx.Comment);
      line.title = unwrapComment(image);
    }
    return line;
  }

  /**
   * Iterate over the lines to extract the contents
   */
  Lines(ctx: CST.LinesCstChildren): IParsedLineData[] {
    const _debug = this.#debug.extend("Lines");
    if (ctx?.Line) {
      const lines = ctx.Line;
      for (const line of lines) {
        this.#blocks.trackLine(line);
      }
      _debug("assembled", this.#blocks.length, "blocks");
      this.#processBlocks({ maxIterations: 1_000_000 });
    }
    return this.#lines;
  }

  /**
   * Get the complete contents of a line of G code
   */
  Line(ctx: CST.LineCstChildren): IParsedLineData {
    const parsed: IParsedLineData = {
      N: NaN,
      END: NaN,
      gCodes: [],
      mCodes: [],
      comments: [],
      addresses: [],
      gCodeMap: {},
      mCodeMap: {},
      addressMap: {},
      hasVariable: false
    };

    if (ctx?.Comment) {
      for (const comment of ctx.Comment) {
        const rawComment = getImage(comment);
        // debug(rawComment);
        parsed.comments.push(unwrapComment(rawComment));
      }
    }

    if (ctx?.LineNumber) {
      parsed.N = this.LineNumber(ctx.LineNumber);
    }

    if (ctx?.EndStatement) {
      const children = getChildren(ctx.EndStatement);
      parsed.END = this.EndStatement(children);
    }

    if (ctx?.G_Code) {
      ctx.G_Code.forEach(token => {
        // debug(getImage(token));
        parsed.gCodes.push(token);
        parsed.gCodeMap[token.image] = true;
      });
    }

    if (ctx?.M_Code) {
      ctx.M_Code.forEach(token => {
        // debug(getImage(token));
        parsed.mCodes.push(token);
        parsed.mCodeMap[token.image] = true;
      });
      if (parsed.mCodeMap.M30) {
        this.#events.emit("END_OF_PROGRAM");
      }
    }

    if (ctx?.AddressedValue) {
      ctx.AddressedValue.forEach(({ children }) => {
        const parsedAddr = this.AddressedValue(children, parsed.gCodeMap);
        parsed.addresses.push(parsedAddr);
        parsed.addressMap[parsedAddr.prefix] = parsedAddr.value;
      });
    }

    if (ctx?.WhileDoExpression) {
      const children = getChildren(ctx.WhileDoExpression);
      this.WhileDoExpression(children);
    }

    if (ctx?.ConditionalExpression) {
      const children = getChildren(ctx.ConditionalExpression);
      // @TODO can this simple visitors use visit() ?
      this.ConditionalExpression(children);
    }

    if (ctx?.GoToStatement) {
      const children = getChildren(ctx.GoToStatement);
      // @TODO can this simple visitors use visit() ?
      this.GoToStatement(children);
    }

    /**
     * THIS CANNOT COME BEFORE if `(ctx?.ConditionalExpression)`
     * It will evaluate the VariableAssignment before the conditional...
     * @TODO guard this better than ordering...
     */
    if (ctx?.VariableAssignment) {
      const children = getChildren(ctx.VariableAssignment);
      this.VariableAssignment(children);
      parsed.hasVariable = true;
    }

    if ("G10" in parsed.gCodeMap) {
      const { addressMap } = parsed;

      this.#memory.g10({
        L: addressMap["L"] as ValidG10OffsetGroups,
        P: addressMap["P"],
        R: addressMap["R"],
        X: addressMap["X"],
        Y: addressMap["Y"],
        Z: addressMap["Z"],
        B: addressMap["B"]
      });
    }

    void this.#events.emit("LINE", parsed);
    return parsed;
  }

  /**
   *
   */
  LineNumber(ctx: IToken[]): number {
    const image = getImage(ctx);
    return parseInt(image.replace("N", ""));
  }

  /**
   *
   */
  DoStatement(ctx: CST.DoStatementCstChildren): number {
    const _debug = this.#debug.extend(`DoStatement`);
    const N = parseImageAsInteger(ctx.BlockNumber);
    _debug("DO%s", N);
    // _debug("pointer was", this.#blocks.getPointer());
    // this.#blocks.setPointerToBlock(N);
    return N;
  }

  /**
   * Move the pointer to the starting GOTO block number
   *
   * @TODO This needs to update the pointer back to the WHILE/DO
   */
  EndStatement(ctx: CST.EndStatementCstChildren): number {
    const _debug = this.#debug.extend(`EndStatement`);
    const N = parseImageAsInteger(ctx.BlockNumber);
    _debug("END%d", N);
    if (this.#looping) {
      this.#blocks.pointerToDoTag(N);
    }
    return N;
  }

  /**
   * Move the pointer to the GOTO block number
   */
  GoToStatement(ctx: CST.GoToStatementCstChildren): number {
    const _debug = this.#debug.extend(`GoToStatement`);
    const N = parseImageAsInteger(ctx.BlockNumber);
    _debug("pointer was", this.#blocks.getPointer());
    this.#blocks.pointerToBlock(N);
    return N;
  }

  /**
   * Update a macro variable regsiter with a value
   */
  VariableAssignment(ctx: CST.VariableAssignmentCstChildren) {
    const _debug = this.#debug.extend(`VariableAssignment`);
    let valueToAssign: number = NaN;
    const macroVar = this.VariableLiteral(getChildren(ctx.VariableLiteral));

    if (ctx?.Expression) {
      valueToAssign = this.Expression(ctx.Expression[0].children);
    }

    const currentValue = this.#memory.read(macroVar.register);

    this.#memory.write(macroVar.register, valueToAssign);
    _debug("#%d was %d is %d", macroVar.register, currentValue, valueToAssign);
  }

  /**
   * This addition -> multiplication -> atomic
   */
  Expression(ctx: CST.ExpressionCstChildren): number {
    const children = getChildren(ctx.AdditionExpression);
    return this.AdditionExpression(children);
  }

  /**
   * This handles subtraction as well since both the
   * `Plus` and `Minus` tokens have the category `AdditionOperator`
   */
  AdditionExpression(ctx: CST.AdditionExpressionCstChildren): number {
    let lhsValue: number = this.MultiplicationExpression(getChildren(ctx.lhs));

    // "rhs" key may be undefined as the grammar defines it as
    // optional(MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhExpr, idx) => {
        // there will be one operator for each rhs operand
        const rhsValue: number = this.MultiplicationExpression(rhExpr.children);

        if (ctx?.AdditionOperator) {
          const operator = ctx.AdditionOperator[idx];

          if (tokenMatcher(operator, Plus)) {
            // debug(lhsValue, "+", rhsValue);
            lhsValue = lhsValue + rhsValue;
          } else {
            // debug(lhsValue, "-", rhsValue);
            lhsValue = lhsValue - rhsValue;
          }
        }
      });
    }

    return lhsValue;
  }

  /**
   * This handles division as well since both the
   * `Product` and `Divide` tokens have the category `MultiplicationOperator`
   */
  MultiplicationExpression(
    ctx: CST.MultiplicationExpressionCstChildren
  ): number {
    let lhsValue: number = this.AtomicExpression(getChildren(ctx.lhs));

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx?.rhs) {
      ctx.rhs.forEach((rhExpr, idx) => {
        // there will be one operator for each rhs operand
        const rhsValue: number = this.AtomicExpression(rhExpr.children);

        if (ctx?.MultiplicationOperator) {
          const operator = ctx.MultiplicationOperator[idx];

          if (tokenMatcher(operator, Product)) {
            // debug(lhsValue, "*", rhsValue);
            lhsValue = lhsValue * rhsValue;
          } else if (tokenMatcher(operator, Modulus)) {
            // debug(lhsValue, "*", rhsValue);
            lhsValue = lhsValue % rhsValue;
          } else {
            // debug(lhsValue, "/", rhsValue);
            lhsValue = lhsValue / rhsValue;
          }
        }
      });
    }

    return lhsValue;
  }

  AtomicExpression(ctx: CST.AtomicExpressionCstChildren): number {
    if (ctx?.NumericLiteral) {
      return this.NumericLiteral(getChildren(ctx.NumericLiteral));
    }
    if (ctx?.VariableLiteral) {
      const macroVar = this.VariableLiteral(getChildren(ctx.VariableLiteral));
      return macroVar.value;
    }
    if (ctx?.FunctionExpression) {
      return this.FunctionExpression(getChildren(ctx.FunctionExpression));
    }
    if (ctx?.BracketExpression) {
      return this.BracketExpression(getChildren(ctx.BracketExpression));
    }
    return NaN;
  }

  /**
   * Ignore the brackets and return the children
   */
  BracketExpression(ctx: CST.BracketExpressionCstChildren) {
    const children = getChildren(ctx.Expression);
    return this.Expression(children);
  }

  /**
   * Evaluate one of the built-in functions
   */
  FunctionExpression(ctx: CST.FunctionExpressionCstChildren): number {
    const func = getImage(ctx?.FunctionName) as MacroBuiltinFunctionNames;
    const children = getChildren(ctx?.BracketExpression);
    const value = this.BracketExpression(children);

    if (typeof value !== "number") {
      throw new Error(
        `Evaluting the input for ${func} failed to produce a number.`
        // `There was an error evaluting the BracketExpression for the input of ${func}.`
      );
    }

    const result = STDLIB[func](value);

    return result;
  }

  ConditionalExpression(ctx: CST.ConditionalExpressionCstChildren) {
    const _debug = this.#debug.extend("ConditionalExpression");
    const children = getChildren(ctx?.AtomicBooleanExpression);
    const boolExpr = this.AtomicBooleanExpression(children);
    _debug(boolExpr);
    if (boolExpr === true) {
      if (ctx?.VariableAssignment) {
        _debug("=> VariableAssignment");
        return this.VariableAssignment(getChildren(ctx.VariableAssignment));
      }
      if (ctx?.GoToStatement) {
        _debug("branching with GOTO");
        this.GoToStatement(getChildren(ctx.GoToStatement));
      }
    }
  }

  /**
   * Evaluate a BooleanExpression into a boolean value
   */
  AtomicBooleanExpression(
    ctx: CST.AtomicBooleanExpressionCstChildren
  ): boolean {
    const _debug = this.#debug.extend("AtomicBooleanExpression");
    const children = getChildren(ctx?.BooleanExpression);
    const lhs = this.AtomicExpression(children.lhs[0].children);
    const rhs = this.AtomicExpression(children.rhs[0].children);
    const operator = unbox(children.BooleanOperator);

    let result = false;
    if (tokenMatcher(operator, EqualTo)) {
      result = lhs === rhs;
    } else if (tokenMatcher(operator, NotEqualTo)) {
      result = lhs !== rhs;
    } else if (tokenMatcher(operator, GreaterThan)) {
      result = lhs > rhs;
    } else if (tokenMatcher(operator, GreaterThanOrEq)) {
      result = lhs >= rhs;
    } else if (tokenMatcher(operator, LessThan)) {
      result = lhs < rhs;
    } else if (tokenMatcher(operator, LessThanOrEq)) {
      result = lhs <= rhs;
    }
    _debug(lhs, operator.image, rhs);
    _debug(result);
    return result;
  }

  /**
   * Interpret the conditional of a While loop
   */
  WhileLoopPredicate(ctx: CST.AtomicWhileExpressionCstChildren) {
    const _debug = this.#debug.extend("WhileLoopPredicate");
    const children = getChildren(ctx.AtomicBooleanExpression);
    const result = this.AtomicBooleanExpression(children);
    _debug(result);
    return result;
  }

  /**
   * Interpret a while loop
   */
  WhileDoExpression(ctx: CST.WhileDoExpressionCstChildren) {
    const _debug = this.#debug.extend("WhileDoExpression");
    const children = getChildren(ctx.WhileLoopPredicate);
    this.#looping = this.WhileLoopPredicate(children);

    if (this.#looping) {
      _debug("continuing...");
    } else {
      _debug("jumping to END");
      const n = this.DoStatement(getChildren(ctx.DoStatement));
      this.#blocks.pointerToEndTag(n);
    }
  }

  /**
   * Parse all possible info out of this address
   */
  AddressedValue(
    ctx: CST.AddressedValueCstChildren,
    gCodeFlags: Record<string, boolean> = {}
  ) {
    const address = new AddressedValue(ctx);
    const insight = new AddressInsight(address);

    if (!hasDwell(gCodeFlags) && !hasG10(gCodeFlags)) {
      this.#insights.collect(insight);
    }

    return address;
  }

  /**
   * A plain number, signed
   */
  NumericLiteral(ctx: CST.NumericLiteralCstChildren): number {
    const value = getImage(ctx.NumericValue);
    const minus = ctx.Minus ? "-" : "";

    return parseNumber(`${minus}${value}`);
  }

  /**
   * A Macro Variable, defined as a `#` and a number
   */
  VariableLiteral(ctx: CST.VariableLiteralCstChildren): MacroVariable {
    const register = Number(getImage(ctx.Integer));
    const macroVar = new MacroVariable(register);

    macroVar.value = this.#memory.read(macroVar.register);

    return macroVar;
  }

  /**
   * If a number, then the visit the node, otherwise evaluate the macro var
   */
  ValueLiteral(ctx: CST.ValueLiteralCstChildren): number {
    if (ctx.NumericLiteral) {
      const children = getChildren(ctx.NumericLiteral);
      return this.NumericLiteral(children);
    }

    if (ctx.VariableLiteral) {
      const children = getChildren(ctx.VariableLiteral);
      const macroVar = this.VariableLiteral(children);
      return macroVar.value;
    }

    return NaN;
  }

  /**
   * The main handler for processing the lines into blocks
   */
  #processBlocks(opts: { maxIterations: number }) {
    const _debug = this.#debug.extend("#processBlocks");

    _debug("Block Count:", this.#blocks.length);

    const maxIterations = opts.maxIterations ?? 100;
    let iterations = 0;
    do {
      _debug(`[ITERATION ${iterations}]`);
      if (iterations > maxIterations) {
        throw new Error(
          `Max iterations (${maxIterations}) reached. Possible infinte loop.`
        );
      }
      const currentPointer = this.#blocks.getPointer();
      const block = this.#blocks.read();

      if (block?.line) {
        const visited = this.Line(block.line);
        _debug(`visited line`);
        _debug("pointer was", this.#blocks.getPointer());
        // THIS MIGHT HAVE UPDATED this.#blocks.pointer
        // _debug("visited", visited);
        this.#lines.push(visited);
        void this.#events.emit("LINE", visited);
      }

      if (this.#looping) {
        // this.#blocks.pointerToDoTag()
      }

      // Check if the pointer was externally modified
      if (this.#blocks.getPointer() === currentPointer) {
        this.#blocks.advancePointer();
        _debug("pointer is", this.#blocks.getPointer());
      }
      iterations++;
    } while (this.#blocks.pointerCanAdvance);
  }
}
