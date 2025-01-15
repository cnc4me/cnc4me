import { tokenMatcher } from "chevrotain";
import Emittery from "emittery";

import { INTERPRETER } from "../config";
import {
  AddressedValue,
  AddressInsight,
  InsightCollection,
  MacroVariable
} from "../lib";
import { NcProgram } from "../lib/NcProgram";
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
import { getImage, parseNumber, unbox, unwrapComment } from "../utils/common";
import { Debuggers } from "../utils/debug";
import { hasDwell, hasG10 } from "../utils/flags";
import { BlockArray, type IBlock } from "./BlockArray";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";
import { STDLIB } from "./StandardLibrary";

import type {
  CST,
  IParsedLineData,
  IProgramNumberLine,
  MacroBuiltinFunctionNames,
  ValidG10OffsetGroups
} from "../types";

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

  #lines: IParsedLineData[] = [];
  #blocks = new BlockArray();

  #memory: MacroMemory;
  #insights: InsightCollection;
  #debug = Debuggers.Interpreter;
  #events = new Emittery<typeof MacroInterpreter.EVENTS>();

  constructor() {
    super();
    this.#debug("initializing");
    this.#memory = new MacroMemory();
    this.#insights = new InsightCollection();
    this.#debug("validating");
    this.validateVisitor();
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

  // /**
  //  * @todo why is this not returning the block numbers?
  //  */
  // getBlockMap() {
  //   return this.#blocks
  //     .map(([N, lineCtx]) => {
  //       return ["N" + `${N}`.padStart(8, "0")].join(" ");
  //     })
  //     .join("\n");
  // }

  getInsights(): InsightCollection {
    return this.#insights;
  }

  /**
   * Root Node for valid NC Programs
   */
  Program(ctx: CST.ProgramCstChildren): NcProgram {
    const { number, title } = this.ProgramNumberLine(
      ctx.ProgramNumberLine[0].children
    );
    const lines = this.Lines(ctx.Lines[0].children);
    return NcProgram.create({ id: number, title, lines });
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
    this.#debug("Lines");
    if (ctx?.Line) {
      const lines = ctx.Line;
      this.#debug("Assembling Blocks");
      for (const line of lines) {
        const block: IBlock = { N: NaN, line: {} };
        if (line.children?.LineNumber) {
          const token = getImage(line.children.LineNumber);
          block.N = Number(token.slice(1));
        }
        block.line = line.children;
        this.#blocks.append(block);
      }

      this.#debug("Interpreting Blocks");
      this.#debug("Block Count:", this.#blocks.length);
      this.#debug(this.#blocks);
      this.#processBlocks({ maxIterations: 10 });
    }
    return this.#lines;
  }

  /**
   * Get the complete contents of a line of G code
   */
  Line(ctx: CST.LineCstChildren): IParsedLineData {
    const parsed: IParsedLineData = {
      N: NaN,
      gCodes: [],
      mCodes: [],
      comments: [],
      addresses: [],
      gCodeMap: {},
      mCodeMap: {},
      addressMap: {},
      hasVariable: false
    };

    if (ctx?.LineNumber) {
      const rawLineNumber = getImage(ctx.LineNumber);
      parsed.N = Number(rawLineNumber.slice(1));
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

    if (ctx?.VariableAssignment) {
      parsed.hasVariable = true;
      const { children } = unbox(ctx.VariableAssignment);
      this.VariableAssignment(children);
    }

    if (ctx?.ConditionalExpression) {
      const { children } = unbox(ctx.ConditionalExpression);
      this.ConditionalExpression(children);
    }

    if (ctx?.AddressedValue) {
      ctx.AddressedValue.forEach(({ children }) => {
        const parsedAddr = this.AddressedValue(children, parsed.gCodeMap);
        parsed.addresses.push(parsedAddr);
        parsed.addressMap[parsedAddr.prefix] = parsedAddr.value;
      });
    }

    if (ctx?.GoToExpression) {
      const { children } = unbox(ctx.GoToExpression);
      this.GoToExpression(children);
    }

    if (ctx?.WhileExpression) {
      const { children } = unbox(ctx.WhileExpression);
      this.WhileLoop(children);
    }

    if (ctx?.Comment) {
      for (const comment of ctx.Comment) {
        const rawComment = getImage(comment);
        // debug(rawComment);
        parsed.comments.push(unwrapComment(rawComment));
      }
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
  ValueLiteral(ctx: CST.ValueLiteralCstChildren) {
    if (ctx.NumericLiteral) {
      return this.visit(
        ctx.NumericLiteral
      ) as VisitorReturnType<"NumericLiteral">;
    }

    if (ctx.VariableLiteral) {
      const macroVar = this.visit(
        ctx.VariableLiteral
      ) as VisitorReturnType<"VariableLiteral">;
      return macroVar.value;
    }

    return NaN;
  }

  /**
   * Update a macro variable regsiter with a value
   */
  VariableAssignment(ctx: CST.VariableAssignmentCstChildren) {
    let valueToAssign: number = NaN;
    const macroVar = this.VariableLiteral(ctx.VariableLiteral[0].children);

    if (ctx?.Expression) {
      valueToAssign = this.Expression(ctx.Expression[0].children);
    }

    // const currentValue = this.#memory.read(macroVar.register);

    this.#memory.write(macroVar.register, valueToAssign);
  }

  /**
   * This addition -> multiplication -> atomic
   */
  Expression(ctx: CST.ExpressionCstChildren): number {
    return this.AdditionExpression(ctx.AdditionExpression[0].children);
  }

  /**
   * This handles subtraction as well since both the
   * `Plus` and `Minus` tokens have the category `AdditionOperator`
   */
  AdditionExpression(ctx: CST.AdditionExpressionCstChildren): number {
    let lhsValue: number = this.MultiplicationExpression(ctx.lhs[0].children);

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
    let lhsValue: number = this.AtomicExpression(ctx.lhs[0].children);

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
      return this.NumericLiteral(ctx.NumericLiteral[0].children);
    }

    if (ctx?.VariableLiteral) {
      const macroVar = this.VariableLiteral(ctx.VariableLiteral[0].children);
      return macroVar.value;
    }

    if (ctx?.FunctionExpression) {
      return this.FunctionExpression(ctx.FunctionExpression[0].children);
    }

    if (ctx?.BracketExpression) {
      return this.BracketExpression(ctx.BracketExpression[0].children);
    }

    return NaN;
    // throw new Error("AtomicExpression did not eval to a number");
  }

  /**
   * Ignore the brackets and return the children
   */
  BracketExpression(ctx: CST.BracketExpressionCstChildren) {
    return this.Expression(ctx.Expression[0].children);
  }

  /**
   * Evaluate one of the built-in functions
   */
  FunctionExpression(ctx: CST.FunctionExpressionCstChildren): number {
    const func = ctx?.FunctionName[0].image as MacroBuiltinFunctionNames;
    const value = this.BracketExpression(ctx?.BracketExpression[0].children);

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
    const { children } = unbox(ctx?.AtomicBooleanExpression);
    const boolExpr = this.AtomicBooleanExpression(children);
    if (boolExpr) {
      if (ctx?.VariableAssignment) {
        return this.VariableAssignment(ctx.VariableAssignment[0].children);
      }
      // if (ctx?.GotoLine) {
      //   this.GotoLine();
      // }
    }
  }

  /**
   * Evaluate a BooleanExpression into a boolean value
   */
  AtomicBooleanExpression(
    ctx: CST.AtomicBooleanExpressionCstChildren
  ): boolean {
    const { children } = unbox(ctx?.BooleanExpression);
    const lhs = this.AtomicExpression(children.lhs[0].children);
    const rhs = this.AtomicExpression(children.rhs[0].children);
    // const operator = getImage(children.BooleanOperator);
    const operator = unbox(children.BooleanOperator);
    if (tokenMatcher(operator, EqualTo)) {
      return lhs === rhs;
    } else if (tokenMatcher(operator, NotEqualTo)) {
      return lhs !== rhs;
    } else if (tokenMatcher(operator, GreaterThan)) {
      return lhs > rhs;
    } else if (tokenMatcher(operator, GreaterThanOrEq)) {
      return lhs >= rhs;
    } else if (tokenMatcher(operator, LessThan)) {
      return lhs < rhs;
    } else if (tokenMatcher(operator, LessThanOrEq)) {
      return lhs <= rhs;
    } else {
      return false;
    }
  }

  /**
   * Interpret a while loop
   */
  WhileLoop(ctx: CST.WhileExpressionCstChildren) {
    const condition = () => {
      const { children } = unbox(ctx.AtomicBooleanExpression);
      return this.AtomicBooleanExpression(children);
    };

    while (condition()) {
      this.Lines(ctx.Lines[0].children);
    }
  }
  /**
   * Move the pointer to the goto line
   */
  GoToExpression(ctx: CST.GoToExpressionCstChildren) {
    const _debug = this.#debug.extend(`goto`);
    const N = parseInt(getImage(ctx.LineNumber));
    _debug("pointer was", this.#blocks.getPointer());
    this.#blocks.setPointerToBlock(N);
    return;
  }

  #processBlocks(opts: { maxIterations: number }) {
    const _debug = this.#debug.extend("blocks");

    const maxIterations = opts.maxIterations ?? 1_000;
    let iterations = 0;
    do {
      _debug(`[LOOP ${iterations}]`);
      if (iterations > maxIterations) {
        throw new Error(
          `Max iterations (${maxIterations}) reached. Possible infinte loop.`
        );
      }
      const currentPointer = this.#blocks.getPointer();
      const block = this.#blocks.read() as IBlock;

      if (block?.line) {
        const visited = this.Line(block.line);
        _debug(`visited line`);
        _debug("pointer was", this.#blocks.getPointer());
        // THIS MIGHT HAVE UPDATED this.#blocks.pointer
        // _debug("visited", visited);
        this.#lines.push(visited);
        void this.#events.emit("LINE", visited);
      }

      // Check if the pointer was externally modified
      if (this.#blocks.getPointer() === currentPointer) {
        this.#blocks.advancePointer();
        _debug("pointer is", this.#blocks.getPointer());
      }
      iterations++;
    } while (!this.#blocks.pointerAtEnd);
  }
}

type InterpreterPropsToIgnore = "events" | "lines" | "memory";

type InterpreterMethodsToMap = Exclude<
  keyof MacroInterpreter,
  InterpreterPropsToIgnore
>;

type VisitorReturnType<T extends InterpreterMethodsToMap> = ReturnType<
  MacroInterpreter[T]
>;
