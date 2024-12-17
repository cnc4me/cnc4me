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
import { Modulus, Plus, Product } from "../tokens";
import {
  CST,
  type IParsedLineData,
  type IProgramNumberLine,
  MacroBuiltinFunctionNames,
  ValidG10OffsetGroups
} from "../types";
import {
  getImage,
  hasDwell,
  hasG10,
  parseNumber,
  unbox,
  unwrapComment
} from "../utils";
import { Debuggers } from "../utils/debug";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";
import { STDLIB } from "./StandardLibrary";

const BaseCstVisitor = MacroParser.getBaseCstVisitor({
  useConstructorDefaults: INTERPRETER.USE_CONSTRUCTOR_WITH_DEFAULTS
});

/**
 * Macro Interpreter
 */
export class MacroInterpreter extends BaseCstVisitor {
  static EVENTS: {
    LINE: IParsedLineData;
  };

  #lines: IParsedLineData[] = [];

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

  on = this.#events.on.bind(this.#events);
  onAny = this.#events.onAny.bind(this.#events);

  getMemory() {
    return this.#memory;
  }

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
   * Iterate over the {@link LineCstChildren} to extract the contents
   */
  Lines(ctx: CST.LinesCstChildren): IParsedLineData[] {
    if (ctx?.Line) {
      for (const line of ctx.Line) {
        const visited = this.Line(line.children);
        this.#lines.push(visited);
        void this.#events.emit("LINE", visited);
      }
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
      addressMap: {}
    };

    if (ctx?.LineNumber) {
      const rawLineNumber = getImage(ctx.LineNumber);
      parsed.N = AddressedValue.valueOf(rawLineNumber);
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
    }

    if (ctx?.VariableAssignment) {
      const { children } = unbox(ctx.VariableAssignment);
      this.VariableAssignment(children);
    }

    if (ctx?.AddressedValue) {
      ctx.AddressedValue.forEach(({ children }) => {
        const parsedAddr = this.AddressedValue(children, parsed.gCodeMap);
        // debug(parsedAddr);
        parsed.addresses.push(parsedAddr);
        parsed.addressMap[parsedAddr.prefix] = parsedAddr.value;
      });
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
   * {@link Plus} and {@link Minus} tokens have
   * the category {@link AdditionOperator}
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
   * {@link Product} and {@link Divide} tokens have
   * the category {@link MultiplicationOperator}
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
}

type InterpreterPropsToIgnore = "events" | "lines";

type InterpreterMethodsToMap = Exclude<
  keyof MacroInterpreter,
  InterpreterPropsToIgnore
>;

type VisitorReturnType<T extends InterpreterMethodsToMap> = ReturnType<
  MacroInterpreter[T]
>;
