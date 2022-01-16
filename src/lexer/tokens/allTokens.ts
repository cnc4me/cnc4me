import {
  Equal,
  GreaterThan,
  GreaterThanOrEq,
  LessThan,
  LessThanOrEq,
  NotEqual
} from "./boolean";
import { CloseBracket, CloseParen, OpenBracket, OpenParen } from "./brackets";
import { AdditionOperator, MultiplicationOperator } from "./categories";
import {
  Address,
  BuiltinFn,
  Comma,
  Comment,
  Divide,
  Do,
  Dot,
  Equals,
  Gcode,
  Goto,
  If,
  LineNumber,
  Mcode,
  Minus,
  Newline,
  NumberLiteral,
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
 *  matches are applied down like a waterfall
 */
export const allTokens = [
  Newline,
  WhiteSpace,
  Gcode,
  Mcode,
  ProgramNumber,
  LineNumber,
  Equal,
  NotEqual,
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
  NumberLiteral,
  Address,
  OpenParen,
  CloseParen,
  OpenBracket,
  CloseBracket,
  AdditionOperator,
  MultiplicationOperator
];

// export const tokenVocab = allTokens.reduce((vocab, token) => {
//   vocab[token.name] = token;
//   return vocab;
// }, {} as Record<string, TokenType>);
