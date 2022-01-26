import { tokenMatcher } from "chevrotain";

import {
  NumericLiteralCstChildren,
  ProgramCstNode,
  ValueLiteralCstChildren,
  VariableAssignmentCstChildren,
  VariableLiteralCstChildren
} from "../types/fanuc";
import { parser } from "./MacroParser";
import { Plus, Product } from "./tokens/tokens";
import { getImage } from "./utils";

// ----------------- Interpreter -----------------
// Obtains the default CstVisitor constructor to extend.
// const BaseCstVisitor = parser.getBaseCstVisitorConstructor();
const BaseCstVisitorWithDefaults =
  parser.getBaseCstVisitorConstructorWithDefaults();

// All our semantics go into the visitor, completly separated from the grammar.
export default class MacroInterpreter extends BaseCstVisitorWithDefaults {
  constructor() {
    super();
    this.validateVisitor();
  }

  program(ctx: ProgramCstNode) {
    return ctx;
  }

  expression(ctx) {
    // visiting an array is equivalent to visiting its first element.
    return this.visit(ctx.additionExpression);
  }

  NumericLiteral(ctx: NumericLiteralCstChildren) {
    const isNegative = ctx.Minus ? true : false;
    const image = getImage(ctx.NumericValue[0]);

    /**
     * @TODO parse int or float here?
     */
    return parseFloat(`${isNegative ? "-" : ""}${image}`);
  }

  VariableLiteral(ctx: VariableLiteralCstChildren) {
    return parseInt(getImage(ctx.Integer));
  }

  ValueLiteral(ctx: ValueLiteralCstChildren) {
    // const v = ctx;

    if (ctx.VariableLiteral) {
      console.log(ctx.VariableLiteral);
    }

    if (ctx.NumericLiteral) {
      const value = this.visit(ctx.NumericLiteral);

      return value;
    }

    // return parseInt(getImage(ctx));
  }

  variableAssignment(ctx: VariableAssignmentCstChildren) {
    const result: { macroVar: number; macroVal: number }[] = [];
    const macroVar = this.visit(ctx.lhs);

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      const macroVal = this.visit(ctx.rhs[0]);
      const assignment = { macroVar, macroVal };

      // console.log(assignment);
      result.push(assignment);
    }

    return result;
  }

  // Note the usage if the "rhs" and "lhs" labels to increase the readability.
  additionExpression(ctx) {
    let result = this.visit(ctx.lhs);

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand);
        const operator = ctx.AdditionOperator[idx];

        if (tokenMatcher(operator, Plus)) {
          result += rhsValue;
        } else {
          // Minus
          result -= rhsValue;
        }
      });
    }

    return result;
  }

  multiplicationExpression(ctx) {
    let result = this.visit(ctx.lhs);

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand);
        const operator = ctx.MultiplicationOperator[idx];

        if (tokenMatcher(operator, Product)) {
          result *= rhsValue;
        } else {
          // Division
          result /= rhsValue;
        }
      });
    }

    return result;
  }

  atomicExpression(ctx) {
    if (ctx.bracketExpression) {
      return this.visit(ctx.bracketExpression);
    } else if (ctx.NumberLiteral) {
      return parseInt(ctx.NumberLiteral[0].image, 10);
    } else if (ctx.powerFunction) {
      return this.visit(ctx.powerFunction);
    }
  }

  bracketExpression(ctx) {
    // The ctx will also contain the bracket tokens, but we don't care about those
    // in the context of calculating the result.
    return this.visit(ctx.expression);
  }

  powerFunction(ctx) {
    const base = this.visit(ctx.base);
    const exponent = this.visit(ctx.exponent);
    return Math.pow(base, exponent);
  }
}

export const interpreter = new MacroInterpreter();
