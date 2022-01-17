import {
  BooleanOperator,
  EqualTo,
  GreaterThan,
  GreaterThanOrEq,
  LessThan,
  LessThanOrEq,
  NotEqualTo
} from "./boolean";
import { CloseBracket, CloseParen, OpenBracket, OpenParen } from "./brackets";
import { AdditionOperator, MultiplicationOperator } from "./categories";
import {
  Address,
  BuiltinFn,
  Comma,
  Comment,
  Decimal,
  Divide,
  Do,
  Dot,
  Equals,
  Goto,
  If,
  Integer,
  LineNumber,
  Minus,
  Newline,
  Percent,
  Plus,
  PowerFunc,
  Product,
  ProgramNumber,
  Then,
  Var,
  While,
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
  LineNumber,
  EqualTo,
  NotEqualTo,
  GreaterThan,
  GreaterThanOrEq,
  LessThan,
  LessThanOrEq,
  If,
  Do,
  Then,
  Goto,
  While,
  BuiltinFn,
  PowerFunc,
  Comment,
  Percent,
  Var,
  Dot,
  Comma,
  Equals,
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
  BooleanOperator,
  AdditionOperator,
  MultiplicationOperator
];
