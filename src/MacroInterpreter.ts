import { tokenMatcher } from "chevrotain";
import { __, match } from "ts-pattern";

import { VariableLookup } from "../types/core";
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
import { degreeToRadian, getImage, radianToDegree, round } from "./utils";

// ----------------- Interpreter -----------------
// Obtains the default CstVisitor constructor to extend.
// const BaseCstVisitor = parser.getBaseCstVisitorConstructor();
const BaseCstVisitorWithDefaults =
  parser.getBaseCstVisitorConstructorWithDefaults();

// All our semantics go into the visitor, completly separated from the grammar.
export default class MacroInterpreter extends BaseCstVisitorWithDefaults {
  vars: MacroVariables;
  varStack: MacroVariables[];

  constructor() {
    super();
    this.vars = new MacroVariables(1, 10);
    this.varStack = [];
    this.validateVisitor();
  }

  getMacros() {
    return this.vars.getMap();
  }

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

    return round(result);
  }

  NumericLiteral(ctx: NumericLiteralCstChildren): number {
    const image = getImage(ctx.NumericValue);
    const value = `${ctx.Minus ? "-" : ""}${image}`;

    return image.includes(".") ? round(parseFloat(value)) : parseInt(value);
  }

  VariableLiteral(ctx: VariableLiteralCstChildren): VariableLookup {
    const register = parseInt(getImage(ctx.Integer));

    return {
      register,
      value: this.vars.read(register)
    };
  }

  ValueLiteral(ctx: ValueLiteralCstChildren) {
    if (ctx.VariableLiteral) {
      const macro: VariableLookup = this.visit(ctx.VariableLiteral);

      return macro.value;
    }

    if (ctx.NumericLiteral) {
      const value = this.visit(ctx.NumericLiteral);

      return value;
    }
  }

  variableAssignment(ctx: VariableAssignmentCstChildren) {
    const macroVar: VariableLookup = this.visit(ctx.lhs);

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      const value = this.visit(ctx.rhs);

      this.vars.write(macroVar.register, value);
    }
  }

  // Note the usage if the "rhs" and "lhs" labels to increase the readability.
  additionExpression(ctx: AdditionExpressionCstChildren) {
    let result = this.visit(ctx.lhs);

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
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

    return round(result);
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

    return round(result);
  }

  atomicExpression(ctx: AtomicExpressionCstChildren) {
    if (ctx.bracketExpression) {
      return this.visit(ctx.bracketExpression);
    } else if (ctx.NumericLiteral) {
      return this.visit(ctx.NumericLiteral);
    } else if (ctx.VariableLiteral) {
      return this.visit(ctx.VariableLiteral);
    } else if (ctx.functionExpression) {
      return this.visit(ctx.functionExpression);
    }
  }

  bracketExpression(ctx: BracketExpressionCstChildren) {
    // The ctx will also contain the bracket tokens, but we don't care about those
    // in the context of calculating the result.
    return this.visit(ctx.expression);
  }
}

export const interpreter = new MacroInterpreter();
