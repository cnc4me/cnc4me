import { TokenType } from "chevrotain";

import {
  Equal,
  GreaterThan,
  GreaterThanOrEq,
  LessThan,
  LessThanOrEq,
  NotEqual
} from "./boolean";
import { CloseBracket, CloseParen, OpenBracket, OpenParen } from "./brackets";
import {
  AdditionOperator,
  Address,
  BuiltinFn,
  Comma,
  Comment,
  Divide,
  Do,
  Dot,
  Equals,
  ExtendedOffset,
  Gcode,
  Goto,
  If,
  LineNumber,
  Mcode,
  Minus,
  MultiplicationOperator,
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
  ExtendedOffset,
  BuiltinFn,
  PowerFunc,
  Gcode,
  Mcode,
  ProgramNumber,
  LineNumber,
  Comment,
  // The Address must appear after the keywords because all keywords are valid identifiers.
  Percent,
  Var,
  Dot,
  Comma,
  Equals,
  Divide,
  Product,
  Minus,
  Plus,
  Address,
  NumberLiteral,
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
