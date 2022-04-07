/* eslint-disable @typescript-eslint/no-unsafe-return */
import { tokenMatcher } from "chevrotain";
import Emittery from "emittery";
import { match } from "ts-pattern";

import { INTERPRETER } from "../PackageConfig";
import type {
  InterpretedProgram,
  MacroInsights,
  ParsedLineData,
  ProgramIdentifier,
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
  varWatches: Array<(payload: WatcherValuePayload) => unknown> = [];

  private _mem: MacroMemory = new MacroMemory();
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

  constructor() {
    super();
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
        debug(line);
        const vLine = this.visit(line);
        debug(vLine);
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
    const lineDebug = debug.extend("line", ":");

    lineDebug(ctx);

    const parsed: ParsedLineData = {
      N: NaN,
      gCodes: [],
      mCodes: [],
      comments: [],
      addresses: [],
      gCodeMap: {},
      mCodeMap: {}
    };

    if (ctx?.Comment) {
      for (const comment of ctx.Comment) {
        const rawComment = getImage(comment);
        parsed.comments.push(unwrapComment(rawComment));
      }
    }

    if (ctx?.G_Code) {
      for (const token of ctx.G_Code) {
        parsed.gCodeMap[token.image] = true;
      }

      parsed.gCodes.push(...ctx.G_Code);
    }

    if (ctx?.M_Code) {
      for (const token of ctx.M_Code) {
        parsed.mCodeMap[token.image] = true;
      }

      parsed.mCodes.push(...ctx.M_Code);
    }

    if (ctx?.LineNumber) {
      const rawLineNumber = getImage(ctx.LineNumber);
      parsed.N = parseInt(stripFirstChar(rawLineNumber));
    }

    if (ctx?.variableAssignment) {
      const { children } = unbox(ctx.variableAssignment);
      const register = this.variableAssignment(children);
      lineDebug(register);
    }

    if (ctx?.AddressedValue) {
      for (const { children } of ctx.AddressedValue) {
        const parsedAddr = this.AddressedValue(children, parsed.gCodeMap);

        parsed.addresses.push(parsedAddr);
      }
    }

    if (parsed.gCodeMap["G10"]) {
      // this.Insights["G10"].collect(ctx.);
      // const g10 = new G10Line({ ...parsed });
      // this._mem.evalG10(g10);
    }

    lineDebug(parsed);

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

    return this.getMacroRegister(register);
  }

  /**
   * If a number, then
   */
  ValueLiteral(ctx: ValueLiteralCstChildren) {
    if (ctx.VariableLiteral) {
      const macro = this.VariableLiteral(ctx.VariableLiteral[0].children);

      return macro.value;
    }

    if (ctx.NumericLiteral) {
      return this.NumericLiteral(ctx.NumericLiteral[0].children);
    }

    return ctx;
  }

  /**
   * Update a macro variable regsiter with a value
   */
  variableAssignment(ctx: VariableAssignmentCstChildren): VariableRegister {
    const macro = this.VariableLiteral(ctx.VariableLiteral[0].children);
    const payload: WatcherValuePayload = {
      register: macro.register,
      curr: NaN,
      prev: macro.value
    };

    const { children } = unbox(ctx.expression);
    const value = this.expression(children);

    payload.curr = value;

    /**
     * @TODO remove the watches for events
     */
    if (this.varWatches[macro.register]) {
      this.varWatches[macro.register](payload);
    }

    return this.setMacroValue(macro.register, value);
  }

  expression(ctx: ExpressionCstChildren): number {
    const { children } = unbox(ctx.additionExpression);
    return this.additionExpression(children);
  }

  functionExpression(ctx: FunctionExpressionCstChildren): number {
    const func = getImage(ctx.BuiltinFunctions);

    const { children } = unbox(ctx.atomicExpression);
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

  bracketExpression(ctx: BracketExpressionCstChildren) {
    return this.expression(ctx.expression[0].children);
  }

  /**
   * Macro Variable Methods
   */

  /**
   * Retrieve a single macro variable register
   */
  getMacroRegister(register: number): VariableRegister {
    const macro = {
      register,
      value: this._mem.read(register) ?? NaN
    };

    return macro;
  }

  /**
   * Retrieve the macro variable map
   */
  getMacros(): [register: number, value: number][] {
    return this._mem.toArray();
  }

  /**
   * Preload a macro variable register with a value
   */
  setMacroValue(register: number, value: number): VariableRegister {
    this._mem.write(register, value);

    debug(`#${register}`, "=", value);

    return this.getMacroRegister(register);
  }

  /**
   * Preload multiple macro variable registers with values
   */
  setMacroVars(registerValues: [register: number, value: number][]) {
    for (const [register, value] of registerValues) {
      this.setMacroValue(register, value);
    }
  }

  /**
   * Attach a method to observe the value changes for a macro register
   */
  watchMacroVar(macroRegister: number, handler: (payload: WatcherValuePayload) => unknown) {
    this.varWatches[macroRegister] = handler;
  }
}
