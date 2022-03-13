/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { tokenMatcher } from "chevrotain";
import { match } from "ts-pattern";

import { INTERPRETER } from "../PackageConfig";
import { ProgramIdentifier, VariableRegister } from "../types";
import {
  AdditionExpressionCstChildren,
  AtomicExpressionCstChildren,
  BracketExpressionCstChildren,
  ExpressionCstChildren,
  FunctionExpressionCstChildren,
  MultiplicationExpressionCstChildren,
  NumericLiteralCstChildren,
  ProgramCstChildren,
  ProgramNumberLineCstChildren,
  ValueLiteralCstChildren,
  VariableAssignmentCstChildren,
  VariableLiteralCstChildren
} from "../types/fanuc";
import { getImage } from "../utils/common";
import { unbox } from "../utils/generics";
import { degreeToRadian, radianToDegree } from "../utils/trig";
import { LoggerConfig, MacroLogger } from "./MacroLogger";
import { parser } from "./MacroParser";
import { MacroVariables } from "./MacroVariables";
import { Plus, Product } from "./Tokens";

interface WatcherValuePayload {
  prev: number;
  curr: number;
  register: number;
}

const BaseCstVisitor = INTERPRETER.USE_CONSTRUCTOR_WITH_DEFAULTS
  ? parser.getBaseCstVisitorConstructorWithDefaults()
  : parser.getBaseCstVisitorConstructor();

/**
 * Macro Interpreter
 */
export class MacroInterpreter extends BaseCstVisitor {
  logger: MacroLogger;

  vars: MacroVariables;
  varStack: MacroVariables[] = [];
  varWatches: Array<(payload: WatcherValuePayload) => unknown> = [];

  constructor() {
    super();

    // Variable Configuration
    this.vars = new MacroVariables(1, 10);

    // Logger Configuration
    this.logger = new MacroLogger();

    // Keep This Last!
    this.validateVisitor();
  }

  public onLog(listener: LoggerConfig["listener"]) {
    this.logger.tap(listener);
  }

  /**
   * Retrieve a single macro variable register
   */
  getMacro(register: number): VariableRegister {
    const macro = {
      register,
      value: this.vars.getMap().get(register) ?? NaN
    };

    return macro;
  }

  /**
   * Retrieve the macro variable map
   */
  getMacros(): Map<number, number> {
    return this.vars.getMap();
  }

  /**
   * Preload a macro variable register with a value
   */
  setMacroValue(register: number, value: number): VariableRegister {
    this.vars.write(register, value);

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

  /**
   * Root Node for valid NC Programs
   */
  program(ctx: ProgramCstChildren) {
    let prgId: ProgramIdentifier = { programNumber: 0, programTitle: "" };

    if (ctx.ProgramNumberLine) {
      prgId = this.visit(ctx.ProgramNumberLine);
    }

    return { ...prgId };
  }

  /**
   * Get the contents of a Program Line
   */
  ProgramNumberLine(ctx: ProgramNumberLineCstChildren): ProgramIdentifier {
    const node = unbox(ctx.ProgramNumber);
    // const comment = unbox(ctx.Comment);

    console.log({ ctx });

    return {
      programNumber: node.payload,
      programTitle: ctx?.Comment ? getImage(ctx.Comment) : ""
    };
  }

  expression(ctx: ExpressionCstChildren) {
    return this.visit(ctx.additionExpression);
  }

  functionExpression(ctx: FunctionExpressionCstChildren) {
    const func = getImage(ctx.BuiltinFunctions);
    const value = this.visit(ctx.atomicExpression);

    // prettier-ignore
    const result = match(func)
      .with("LN",    () => Math.log(value))
      .with("ABS",   () => Math.abs(value))
      .with("FUP",   () => Math.ceil(value))
      .with("SQRT",  () => Math.sqrt(value))
      .with("FIX",   () => Math.floor(value))
      .with("ROUND", () => Math.round(value))
      .with("SIN",   () => Math.sin(degreeToRadian(value)))
      .with("COS",   () => Math.cos(degreeToRadian(value)))
      .with("TAN",   () => Math.tan(degreeToRadian(value)))
      .with("ASIN",  () => radianToDegree(Math.asin(value)))
      .with("ACOS",  () => radianToDegree(Math.acos(value)))
      .with("ATAN",  () => radianToDegree(Math.atan(value)))
      .otherwise(() => NaN);

    return result;
  }

  NumericLiteral(ctx: NumericLiteralCstChildren): number {
    const image = getImage(ctx.NumericValue);
    const value = `${ctx.Minus ? "-" : ""}${image}`;

    return image.includes(".") ? parseFloat(value) : parseInt(value);
  }

  VariableLiteral(ctx: VariableLiteralCstChildren) {
    const register = parseInt(getImage(ctx.Integer));

    return this.getMacro(register);
  }

  ValueLiteral(ctx: ValueLiteralCstChildren) {
    if (ctx.VariableLiteral) {
      const macro: VariableRegister = this.visit(ctx.VariableLiteral);

      return macro.value;
    }

    if (ctx.NumericLiteral) {
      return this.visit(ctx.NumericLiteral);
    }
  }

  /**
   * Update a macro variable regsiter with a value
   */
  variableAssignment(ctx: VariableAssignmentCstChildren) {
    const macro: VariableRegister = this.visit(ctx.VariableLiteral);
    const values: WatcherValuePayload = {
      register: macro.register,
      curr: NaN,
      prev: macro.value
    };

    const value = this.visit(ctx.expression);

    values.curr = value;

    this.setMacroValue(macro.register, value);

    if (this.varWatches[macro.register]) {
      this.varWatches[macro.register](values);
    }
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
      return this.visit(ctx.bracketExpression);
    } else if (ctx.NumericLiteral) {
      return this.visit(ctx.NumericLiteral);
    } else if (ctx.VariableLiteral) {
      const macroVar: VariableRegister = this.visit(ctx.VariableLiteral);

      return macroVar.value;
    } else if (ctx.functionExpression) {
      return this.visit(ctx.functionExpression);
    }
  }

  bracketExpression(ctx: BracketExpressionCstChildren) {
    return this.visit(ctx.expression);
  }
}

export const interpreter = new MacroInterpreter();
