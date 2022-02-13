import { tokenMatcher } from "chevrotain";
import { match } from "ts-pattern";
import { createEmitter } from "ts-typed-events";

import { VariableRegister } from "../types";
import {
  AdditionExpressionCstChildren,
  AtomicExpressionCstChildren,
  BracketExpressionCstChildren,
  ExpressionCstChildren,
  FunctionExpressionCstChildren,
  MultiplicationExpressionCstChildren,
  NumericLiteralCstChildren,
  ProgramCstNode,
  ValueLiteralCstChildren,
  VariableAssignmentCstChildren,
  VariableLiteralCstChildren
} from "../types/fanuc";
import { parser } from "./MacroParser";
import MacroVariables from "./MacroVariables";
import { Plus, Product } from "./tokens/tokens";
import { degreeToRadian, getImage, radianToDegree } from "./utils";

// const BaseCstVisitor = parser.getBaseCstVisitorConstructor();
const BaseCstVisitorWithDefaults =
  parser.getBaseCstVisitorConstructorWithDefaults();

interface WatcherValuePayload {
  prev: number;
  curr: number;
  register: number;
}

export class MacroInterpreter extends BaseCstVisitorWithDefaults {
  vars: MacroVariables;
  varStack: MacroVariables[] = [];
  varWatches: Array<(payload: WatcherValuePayload) => unknown> = [];

  constructor() {
    super();
    this.vars = new MacroVariables(1, 10);
    this.validateVisitor();
  }

  /**
   * Retrieve a single macro variable register
   */
  getMacro(register: number): VariableRegister {
    const macro = {
      register,
      value: this.vars.getMap().get(register) ?? NaN,
      setValue: (value: number) => {
        this.vars.write(register, value);
        return macro;
      }
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
  setMacroVar(register: number, value: number): VariableRegister {
    return this.getMacro(register).setValue(value);
  }

  /**
   * Preload multiple macro variable registers with values
   */
  setMacroVars(registerValues: [register: number, value: number][]) {
    for (const [register, value] of registerValues) {
      this.setMacroVar(register, value);
    }
  }

  /**
   * Attach a method to observe the value changes for a macro register
   */
  watchMacroVar(
    macroRegister: number,
    handler: (payload: WatcherValuePayload) => unknown
  ) {
    this.varWatches[macroRegister] = handler;
  }

  /**
   * Root Node for valid NC Programs
   */
  program(ctx: ProgramCstNode) {
    return ctx;
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

    this.vars.write(macro.register, value);

    if (this.varWatches[macro.register]) {
      this.varWatches[macro.register](values);
    }
  }

  additionExpression(ctx: AdditionExpressionCstChildren) {
    let result = this.visit(ctx.lhs);

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each  rhs operand
        const rhsValue = this.visit(rhsOperand);

        if (ctx?.AdditionOperator) {
          const operator = ctx.AdditionOperator[idx];

          if (tokenMatcher(operator, Plus)) {
            result += rhsValue;
          } else {
            // Minus
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
            result *= rhsValue;
          } else {
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
