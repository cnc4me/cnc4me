import {
  AdditionOperator,
  Address,
  BooleanOperator,
  BuiltinFunction,
  CloseBracket,
  CloseParen,
  Comment,
  ControlFlowKeyword,
  Decimal,
  Divide,
  Do,
  Equals,
  EqualTo,
  Gcode,
  GotoLine,
  GreaterThan,
  GreaterThanOrEq,
  Grouping,
  If,
  Integer,
  LessThan,
  LessThanOrEq,
  LineNumber,
  Mcode,
  Minus,
  MultiplicationOperator,
  Newline,
  NotEqualTo,
  NumericValue,
  OpenBracket,
  OpenParen,
  Percent,
  Plus,
  Product,
  ProgramNumber,
  SemiColon,
  Then,
  Var,
  While,
  WhiteSpace
} from "./tokens";

/**
 * The order of tokens is important because token
 * matches are applied sequentially
 */
export const TOKEN_VOCABULARY = [
  Newline,
  WhiteSpace,
  Comment,
  While,
  BuiltinFunction,
  GotoLine,
  Then,
  Do,
  If,
  EqualTo,
  NotEqualTo,
  GreaterThan,
  GreaterThanOrEq,
  LessThan,
  LessThanOrEq,
  LineNumber,
  ProgramNumber,
  Mcode,
  Gcode,
  Address,
  Decimal, // Must come before Integer
  Integer,
  Divide,
  Product,
  Minus,
  Plus,
  Var,
  Equals,
  // Comma,
  Percent,
  SemiColon,

  /**
   * Grouping
   */
  OpenParen,
  CloseParen,
  OpenBracket,
  CloseBracket,

  /**
   * Categories
   */
  Grouping,
  NumericValue,
  ControlFlowKeyword,
  BooleanOperator,
  AdditionOperator,
  MultiplicationOperator
];
