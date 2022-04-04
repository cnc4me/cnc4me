/* eslint-disable @typescript-eslint/no-unsafe-return */
import { tokenMatcher } from "chevrotain";
import Debug from "debug";
import Emittery from "emittery";
import { match } from "ts-pattern";

import { INTERPRETER } from "../PackageConfig";
import type {
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
  parseNumber,
  radianToDegree,
  trimLeadingChar,
  unbox,
  unwrap
} from "../utils";
import { AddressInsight } from "./AddressInsight";
// import { G10Line } from "./G10Line";
import { LoggerConfig, MacroLogger } from "./MacroLogger";
import { MacroMemory } from "./MacroMemory";
import { parser } from "./MacroParser";
import { NcAddress } from "./NcAddress";
import { Plus, Product } from "./Tokens";

// interface GcodeFlags {
//   [K: string]: boolean;
// }

const BaseVisitor = INTERPRETER.USE_CONSTRUCTOR_WITH_DEFAULTS
  ? parser.getBaseCstVisitorConstructorWithDefaults()
  : parser.getBaseCstVisitorConstructor();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debug = Debug("macro:interpreter");

/**
 * Macro Interpreter
 */
export class MacroInterpreter extends BaseVisitor {
  events: Emittery = new Emittery();
  logger: MacroLogger = new MacroLogger();

  varWatches: Array<(payload: WatcherValuePayload) => unknown> = [];

  private _mem: MacroMemory = new MacroMemory();
  private _insights: Record<string, AddressInsight> = {};

  get Offsets() {
    return this._mem;
  }

  get Insights() {
    return this._insights;
  }

  constructor() {
    super();
    this.validateVisitor();
  }

  onLog(listener: LoggerConfig["listener"]) {
    this.logger.tap(listener);
  }

  /**
   * Root Node for valid NC Programs
   */
  program(ctx: ProgramCstChildren) {
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
        const vLine = this.Line(line.children);

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
      programTitle: unwrap(comment),
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
      mCodeMap: {}
    };

    if (ctx?.Comment) {
      for (const comment of ctx.Comment) {
        parsed.comments.push(unwrap(getImage(comment)));
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
      parsed.N = parseInt(trimLeadingChar(getImage(ctx.LineNumber)));
    }

    if (ctx?.AddressedValue) {
      for (const { children } of ctx.AddressedValue) {
        const parsedAddr = this.AddressedValue(children, parsed.gCodeMap);

        parsed.addresses.push(parsedAddr);
      }
    }

    if (parsed.gCodeMap["G10"]) {
      // const g10 = new G10Line({ ...parsed });
      // this._mem.evalG10(g10);
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

    if (!(address.prefix in this._insights)) {
      this._insights[address.prefix] = new AddressInsight(address.prefix);
    }

    if (!hasDwell(gCodeFlags)) {
      this._insights[address.prefix].collect(address);
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
  VariableLiteral(ctx: VariableLiteralCstChildren) {
    const register = parseInt(getImage(ctx.Integer));

    return this.getMacro(register);
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
  variableAssignment(ctx: VariableAssignmentCstChildren) {
    const macro = this.VariableLiteral(ctx.VariableLiteral[0].children);
    const values: WatcherValuePayload = {
      register: macro.register,
      curr: NaN,
      prev: macro.value
    };

    const value = this.expression(ctx.expression[0].children);

    values.curr = value;

    this.setMacroValue(macro.register, value);

    /**
     * @TODO remove the watches for events
     */
    if (this.varWatches[macro.register]) {
      this.varWatches[macro.register](values);
    }
  }

  expression(ctx: ExpressionCstChildren) {
    return this.additionExpression(ctx.additionExpression[0].children);
  }

  functionExpression(ctx: FunctionExpressionCstChildren): number {
    const func = getImage(ctx.BuiltinFunctions);
    const value = this.atomicExpression(ctx.atomicExpression[0].children);

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

  additionExpression(ctx: AdditionExpressionCstChildren) {
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
            this.logger.operation(result, "+", rhsValue);
            result += rhsValue;
          } else {
            this.logger.operation(result, "-", rhsValue);
            result -= rhsValue;
          }
        }
      });
    }

    return result;
  }

  multiplicationExpression(ctx: MultiplicationExpressionCstChildren) {
    let result = this.visit(ctx.lhs);

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand);

        if (ctx?.MultiplicationOperator) {
          const operator = ctx.MultiplicationOperator[idx];

          if (tokenMatcher(operator, Product)) {
            this.logger.operation(result, "*", rhsValue);
            result *= rhsValue;
          } else {
            this.logger.operation(result, "/", rhsValue);
            result /= rhsValue;
          }
        }
      });
    }

    return result;
  }

  atomicExpression(ctx: AtomicExpressionCstChildren) {
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
      return ctx;
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
  getMacro(register: number): VariableRegister {
    const macro = {
      register,
      value: this._mem.read(register) ?? NaN
    };

    return macro;
  }

  /**
   * Retrieve the macro variable map
   */
  getMacros(): number[][] {
    return this._mem.toArray();
  }

  /**
   * Preload a macro variable register with a value
   */
  setMacroValue(register: number, value: number): VariableRegister {
    this._mem.write(register, value);

    this.logger.operation(`#${register}`, "=", value);

    return this.getMacro(register);
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
