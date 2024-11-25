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
  Fences,
  Gcode,
  GotoLine,
  GreaterThan,
  GreaterThanOrEq,
  If,
  Integer,
  LessThan,
  LessThanOrEq,
  LineNumber,
  Mcode,
  Minus,
  Modulus,
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
} from "../tokens";

/**
 * The order of tokens is important because token
 * matches are applied sequentially
 */
export const FANUC_MACRO_B_GRAMMAR = [
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
  Decimal, // Must come before Integer
  Integer,
  Plus,
  Minus,
  Product,
  Divide,
  Modulus,
  Var,
  Equals,
  // Comma,
  Percent,
  SemiColon,
  Address,

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
  Fences,
  NumericValue,
  ControlFlowKeyword,
  BooleanOperator,
  AdditionOperator,
  MultiplicationOperator
];
