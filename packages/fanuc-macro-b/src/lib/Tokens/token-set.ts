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
import { Do, GotoLine, If, Then, While } from "./control-flow";
import {
  Comma,
  Divide,
  Equals,
  Minus,
  Newline,
  Percent,
  Plus,
  Product,
  Var
} from "./symbols";
import {
  Address,
  BuiltinFunctions,
  Comment,
  Decimal,
  Gcode,
  Integer,
  LineNumber,
  Mcode,
  ProgramNumber,
  WhiteSpace
} from "./tokens";

/**
 * The order of tokens is important because token
 * matches are applied sequentially
 */
export const tokenSet = [
  Newline,
  WhiteSpace,
  Percent,
  Comment,
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
  Var,
  Equals,
  Comma,
  Divide,
  Product,
  Minus,
  Plus,
  Gcode,
  Mcode,
  LineNumber,
  ProgramNumber,
  Address,
  Decimal,
  Integer,
  OpenParen,
  CloseParen,
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
