/* eslint-disable @typescript-eslint/no-unsafe-return */
import { tokenMatcher } from "chevrotain";
import Emittery from "emittery";
import { match } from "ts-pattern";

import { INTERPRETER } from "../PackageConfig";
import type {
  InterpretedProgram,
  ParsedLineData,
  ProgramIdentifier,
  ValidG10OffsetGroups,
  VariableRegister,
  WatcherValuePayload
} from "../types";
import type {
  AdditionExpressionCstChildren,
  AddressedValueCstChildren,
  AtomicExpressionCstChildren,
  BracketExpressionCstChildren,
  ExpressionCstChildren,
  FunctionExpressionCstChildren,
  LineCstChildren,
  LinesCstChildren,
  MultiplicationExpressionCstChildren,
  NumericLiteralCstChildren,
  ProgramCstChildren,
  ProgramNumberLineCstChildren,
  ValueLiteralCstChildren,
  VariableAssignmentCstChildren,
  VariableLiteralCstChildren
} from "../types/fanuc";
import {
  degreeToRadian,
  getImage,
  hasDwell,
  hasG10,
  parseNumber,
  radianToDegree,
  stripFirstChar,
  unbox,
  unwrapComment
} from "../utils";
import { interpreter as debug } from "./debuggers";
import { AddressInsight, InsightCollection } from "./Insights";
import { MacroMemory } from "./MacroMemory";
import { parser } from "./MacroParser";
import { NcAddress } from "./NcAddress";
import { Plus, Product } from "./Tokens";

const BaseVisitor = INTERPRETER.USE_CONSTRUCTOR_WITH_DEFAULTS
  ? parser.getBaseCstVisitorConstructorWithDefaults()
  : parser.getBaseCstVisitorConstructor();

/**
 * Macro Interpreter
 */
export class MacroInterpreter extends BaseVisitor {
  events: Emittery = new Emittery();

  private _mem: MacroMemory;
  private _insights: InsightCollection = new InsightCollection();

  get Memory(): MacroMemory {
    return this._mem;
  }

  set Memory(mem: MacroMemory) {
    this._mem = mem;
  }

  get Insights(): InsightCollection {
    return this._insights;
  }

  constructor(opts?: { memory: MacroMemory }) {
    super();
    debug("initializing");
    this._mem = opts?.memory ?? new MacroMemory();
    this.validateVisitor();
  }

  /**
   * Root Node for valid NC Programs
   */
  program(ctx: ProgramCstChildren): InterpretedProgram {
    const prgId = this.ProgramNumberLine(ctx.ProgramNumberLine[0].children);
    const lines = this.lines(ctx.lines[0].children);
    // const g10s = this._mem.
    return { ...prgId, lines };
  }

  /**
   * Itterate over the {@link LineCstChildren} to extract the contents
   */
  lines(ctx: LinesCstChildren): ParsedLineData[] {
    const lines: ParsedLineData[] = [];

    if (ctx.Line) {
      for (const line of ctx.Line) {
        const vLine = this.visit(line);
        lines.push(vLine);
      }
    }

    return lines;
  }

  /**
   * Get the Program title and number
   */
  ProgramNumberLine(ctx: ProgramNumberLineCstChildren): ProgramIdentifier {
    const node = unbox(ctx.ProgramNumber);
    const comment = ctx?.Comment ? getImage(ctx.Comment) : "";

    return {
      programTitle: unwrapComment(comment),
      programNumber: parseInt(node.payload)
    };
  }

  /**
   * Get the complete contents of a line of G code
   */
  Line(ctx: LineCstChildren): ParsedLineData {
    const parsed: ParsedLineData = {
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
      debug(rawLineNumber);
      parsed.N = parseInt(stripFirstChar(rawLineNumber));
    }

    if (ctx?.G_Code) {
      ctx.G_Code.forEach(token => {
        debug(getImage(token));
        parsed.gCodes.push(token);
        parsed.gCodeMap[token.image] = true;
      });
    }

    if (ctx?.M_Code) {
      ctx.M_Code.forEach(token => {
        debug(getImage(token));
        parsed.mCodes.push(token);
        parsed.mCodeMap[token.image] = true;
      });
    }

    if (ctx?.variableAssignment) {
      const { children } = unbox(ctx.variableAssignment);
      this.variableAssignment(children);
    }

    if (ctx?.AddressedValue) {
      ctx.AddressedValue.forEach(({ children }) => {
        const parsedAddr = this.AddressedValue(children, parsed.gCodeMap);
        debug(parsedAddr);
        parsed.addresses.push(parsedAddr);
        parsed.addressMap[parsedAddr.prefix] = parsedAddr.value;
      });
    }

    if (ctx?.Comment) {
      for (const comment of ctx.Comment) {
        const rawComment = getImage(comment);
        debug(rawComment);
        parsed.comments.push(unwrapComment(rawComment));
      }
    }

    if ("G10" in parsed.gCodeMap) {
      const { addressMap } = parsed;

      // this.Insights["G10"].collect(ctx.);
      // const g10 = new G10Line(values);
      this._mem.g10({
        L: addressMap["L"] as ValidG10OffsetGroups,
        P: addressMap["P"],
        R: addressMap["R"],
        X: addressMap["X"],
        Y: addressMap["Y"],
        Z: addressMap["Z"],
        B: addressMap["B"]
      });
    }

    return parsed;
  }

  /**
   * Parse all possible info out of this address
   */
  AddressedValue(
    ctx: AddressedValueCstChildren,
    gCodeFlags: Record<string, boolean> = {}
  ): NcAddress {
    const address = new NcAddress(ctx);
    const insight = new AddressInsight(address);

    if (!hasDwell(gCodeFlags) && !hasG10(gCodeFlags)) {
      this._insights.collect(insight);
    }

    return address;
  }

  /**
   * A plain number, signed
   */
  NumericLiteral(ctx: NumericLiteralCstChildren): number {
    const value = getImage(ctx.NumericValue);
    const minus = ctx.Minus ? "-" : "";

    return parseNumber(`${minus}${value}`);
  }

  /**
   * A Macro Variable, defined as a `#` and a number
   */
  VariableLiteral(ctx: VariableLiteralCstChildren): VariableRegister {
    const register = parseInt(getImage(ctx.Integer));
    const macro = {
      register,
      value: this._mem.read(register) ?? NaN
    };

    return macro;
  }

  /**
   * If a number, then the visit the node, otherwise evaluate the macro var
   */
  ValueLiteral(ctx: ValueLiteralCstChildren) {
    let value = NaN;

    if (ctx.VariableLiteral) {
      const { children } = unbox(ctx.VariableLiteral);
      const macro = this.VariableLiteral(children);
      value = macro.value;
    }

    if (ctx.NumericLiteral) {
      const { children } = unbox(ctx.NumericLiteral);
      value = this.NumericLiteral(children);
    }

    return value;
  }

  /**
   * Update a macro variable regsiter with a value
   */
  variableAssignment(ctx: VariableAssignmentCstChildren) {
    const varLitChildren = unbox(ctx.VariableLiteral).children;
    const macro = this.VariableLiteral(varLitChildren);
    const payload: WatcherValuePayload = {
      register: macro.register,
      curr: NaN,
      prev: macro.value
    };

    const exprChildren = unbox(ctx.expression).children;
    const value = this.expression(exprChildren);

    payload.curr = value;

    /**
     * @TODO remove the watches for events
     */
    // if (this.varWatches[macro.register]) {
    //   this.varWatches[macro.register](payload);
    // }

    this._mem.write(macro.register, value);
  }

  /**
   *
   */
  expression(ctx: ExpressionCstChildren): number {
    const { children } = unbox(ctx.additionExpression);
    return this.additionExpression(children);
  }

  /**
   * Evaluate one of the built-in functions proivided by the system
   */
  functionExpression(ctx: FunctionExpressionCstChildren): number {
    const { children } = unbox(ctx.atomicExpression);
    const func = getImage(ctx.BuiltinFunctions);
    const value = this.atomicExpression(children);

    // prettier-ignore
    const result = match(func)
      .with("LN", () => Math.log(value))
      .with("ABS", () => Math.abs(value))
      .with("FUP", () => Math.ceil(value))
      .with("SQRT", () => Math.sqrt(value))
      .with("FIX", () => Math.floor(value))
      .with("ROUND", () => Math.round(value))
      .with("SIN", () => Math.sin(degreeToRadian(value)))
      .with("COS", () => Math.cos(degreeToRadian(value)))
      .with("TAN", () => Math.tan(degreeToRadian(value)))
      .with("ASIN", () => radianToDegree(Math.asin(value)))
      .with("ACOS", () => radianToDegree(Math.acos(value)))
      .with("ATAN", () => radianToDegree(Math.atan(value)))
      .otherwise(() => NaN);

    return result;
  }

  additionExpression(ctx: AdditionExpressionCstChildren): number {
    let result = this.visit(ctx.lhs);

    // "rhs" key may be undefined as the grammar defines it as
    // optional(MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand);

        if (ctx?.AdditionOperator) {
          const operator = ctx.AdditionOperator[idx];

          if (tokenMatcher(operator, Plus)) {
            debug(result, "+", rhsValue);
            result += rhsValue;
          } else {
            debug(result, "-", rhsValue);
            result -= rhsValue;
          }
        }
      });
    }

    return result;
  }

  multiplicationExpression(ctx: MultiplicationExpressionCstChildren): number {
    let result = this.visit(ctx.lhs);

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand);

        if (ctx?.MultiplicationOperator) {
          const operator = ctx.MultiplicationOperator[idx];

          if (tokenMatcher(operator, Product)) {
            debug(result, "*", rhsValue);
            result *= rhsValue;
          } else {
            debug(result, "/", rhsValue);
            result /= rhsValue;
          }
        }
      });
    }

    return result;
  }

  atomicExpression(ctx: AtomicExpressionCstChildren): number {
    if (ctx.bracketExpression) {
      return this.bracketExpression(ctx.bracketExpression[0].children);
    } else if (ctx.NumericLiteral) {
      return this.NumericLiteral(ctx.NumericLiteral[0].children);
    } else if (ctx.functionExpression) {
      return this.functionExpression(ctx.functionExpression[0].children);
    } else if (ctx.VariableLiteral) {
      const macroVar = this.VariableLiteral(ctx.VariableLiteral[0].children);
      return macroVar.value;
    } else {
      return NaN;
    }
  }

  /**
   * Ignore the brackets and return the children
   */
  bracketExpression(ctx: BracketExpressionCstChildren) {
    const { children } = unbox(ctx.expression);
    return this.expression(children);
  }
}
