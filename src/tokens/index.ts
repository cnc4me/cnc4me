import {
  EqualTo,
  GreaterThan,
  GreaterThanOrEq,
  LessThan,
  LessThanOrEq,
  NotEqualTo
} from "./boolean";
import { CloseBracket, OpenBracket } from "./brackets";
import {
  AdditionOperator,
  BooleanOperator,
  Brackets,
  ControlFlowKeyword,
  MultiplicationOperator,
  NumericValue
} from "./categories";
import { Do, GotoLine, If, Then, While } from "./controlFlow";
import {
  Address,
  BuiltinFunctions,
  Comma,
  Comment,
  Decimal,
  Divide,
  Equals,
  Integer,
  // LineNumber,
  Minus,
  Newline,
  Percent,
  Plus,
  Product,
  ProgramNumber,
  Var,
  WhiteSpace
} from "./tokens";

export {
  AdditionOperator,
  Address,
  BooleanOperator,
  Brackets,
  BuiltinFunctions,
  CloseBracket,
  Comma,
  Comment,
  ControlFlowKeyword,
  Decimal,
  Divide,
  Do,
  Equals,
  EqualTo,
  GotoLine,
  GreaterThan,
  GreaterThanOrEq,
  If,
  Integer,
  LessThan,
  LessThanOrEq,
  Minus,
  MultiplicationOperator,
  Newline,
  NotEqualTo,
  NumericValue,
  OpenBracket,
  Percent,
  Plus,
  Product,
  ProgramNumber,
  Then,
  Var,
  While,
  WhiteSpace
};

/**
 * The order of tokens is important because token
 *  matches are applied sequentially
 */
export const allTokens = [
  Newline,
  WhiteSpace,
  // Gcode,
  // Mcode,
  ProgramNumber,
  // LineNumber,
  EqualTo,
  NotEqualTo,
  GreaterThan,
  GreaterThanOrEq,
  LessThan,
  LessThanOrEq,
  If,
  Do,
  Then,
  While,
  GotoLine,
  BuiltinFunctions,
  Comment,
  Var,
  Equals,
  Comma,
  Divide,
  Product,
  Minus,
  Plus,
  Percent,
  Address,
  Decimal,
  Integer,
  OpenBracket,
  CloseBracket,

  /**
   * Categories
   */
  ControlFlowKeyword,
  Brackets,
  NumericValue,
  BooleanOperator,
  AdditionOperator,
  MultiplicationOperator
];
