import {
  EqualTo,
  GreaterThan,
  GreaterThanOrEq,
  LessThan,
  LessThanOrEq,
  NotEqualTo
} from "./boolean";
import { CloseBracket, CloseParen, OpenBracket, OpenParen } from "./brackets";
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
  Comma,
  Comment,
  Decimal,
  Divide,
  Equals,
  Functions,
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
  GotoLine,
  While,
  Functions,
  Comment,
  Percent,
  Var,
  Equals,
  // Dot,
  Comma,
  Divide,
  Product,
  Minus,
  Plus,
  // NumberLiteral,
  Address,
  Decimal,
  Integer,
  OpenParen,
  CloseParen,
  OpenBracket,
  CloseBracket,

  // Categories
  ControlFlowKeyword,
  Brackets,
  NumericValue,
  BooleanOperator,
  AdditionOperator,
  MultiplicationOperator
];
