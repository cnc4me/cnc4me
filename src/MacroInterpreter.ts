import { tokenMatcher } from "chevrotain";

import { parser } from "./MacroParser";
import { Plus, Product } from "./tokens/tokens";

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

  expression(ctx) {
    // visiting an array is equivalent to visiting its first element.
    return this.visit(ctx.additionExpression);
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
    if (ctx.parenthesisExpression) {
      return this.visit(ctx.parenthesisExpression);
    } else if (ctx.NumberLiteral) {
      return parseInt(ctx.NumberLiteral[0].image, 10);
    } else if (ctx.powerFunction) {
      return this.visit(ctx.powerFunction);
    }
  }

  parenthesisExpression(ctx) {
    // The ctx will also contain the parenthesis tokens, but we don't care about those
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
