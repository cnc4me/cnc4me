import * as chevrotain from "chevrotain";

import { AltTokenFactory, basicToken, createCategory } from "./Tokens";

const { Lexer, createToken } = chevrotain;

export const BooleanOperator = createCategory("BooleanOperator");
export const AdditionOperator = createCategory("AdditionOperator");
export const MultiplicationOperator = createCategory("MultiplicationOperator");

export const Plus = createToken({
  name: "Plus",
  pattern: /\+/,
  categories: AdditionOperator
});

export const Minus = createToken({
  name: "Minus",
  pattern: /-/,
  categories: AdditionOperator
});

export const Divide = createToken({
  name: "Divide",
  pattern: /\//,
  categories: MultiplicationOperator
});

export const Product = createToken({
  name: "Product",
  pattern: /\*/,
  categories: MultiplicationOperator
});

export const Var = createToken({ name: "Var", pattern: /#/ });
export const Equals = createToken({ name: "Equals", pattern: /=/ });
export const Percent = createToken({ name: "Percent", pattern: /%/ });
export const Address = createToken({ name: "Address", pattern: /[A-Z]/ });

export const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /[-]?(?:[0-9]*[.])?[0-9]+/
});

export const Dot = basicToken("Dot", /\./);
export const Comma = basicToken("Comma", /,/);
export const Newline = basicToken("Newline", /\n/);
export const OpenParen = basicToken("OpenParen", /\(/);
export const CloseParen = basicToken("CloseParen", /\)/);
export const OpenBracket = basicToken("OpenBracket", /\[/);
export const CloseBracket = basicToken("CloseBracket", /\]/);

/**
 * Address Based Tokens
 */
const AddressToken = AltTokenFactory(Address);

export const Gcode = createToken({
  name: "G_Code",
  pattern: /G\d+/,
  longer_alt: Address,
  group: "gcodes"
});

export const Mcode = AddressToken("M_Code", /M\d+(\.)?/);
export const LineNumber = AddressToken("LineNumber", /N\d+/);
export const ProgramNumber = AddressToken("ProgramNumber", /[O|:]\d+/);
export const ExtendedOffset = AddressToken("ExtendedOffset", /G54\.\d/);

export const Goto = AddressToken("Goto", /GOTO/);
export const If = AddressToken("ControlFlow_If", /IF/);
export const Then = AddressToken("ControlFlow_Then", /THEN/);
export const Do = AddressToken("ControlFlow_Do", /DO/);
export const While = AddressToken("ControlFlow_While", /WHILE/);

export const Equal = createToken({
  name: "Equal",
  pattern: /EQ/
});
export const NotEqual = createToken({
  name: "NotEqual",
  pattern: /NE/
});
export const LessThan = createToken({
  name: "LessThan",
  pattern: /LT/
});
export const LessThanOrEq = createToken({
  name: "LessThanOrEq",
  pattern: /LE/
});
export const GreaterThan = createToken({
  name: "GreaterThan",
  pattern: /GT/
});
export const GreaterThanOrEq = createToken({
  name: "GreaterThanOrEq",
  pattern: /GE/
});

export const PowerFunc = createToken({
  name: "PowerFunc",
  pattern: /POW/,
  longer_alt: Address
});

export const BuiltinFn = createToken({
  name: "BuiltInFunction",
  pattern: /SIN|ASIN|COS|ACOS|TAN|ATAN|SQRT|ABS|BIN|BCD|ROUND|FIX|FUP|LN|EXP/,
  longer_alt: Address
});

export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /[\s\t\r]+/,
  group: Lexer.SKIPPED
});

export const Comment = createToken({
  name: "Comment",
  pattern: /\(\s*(.+?)\s*\)/,
  group: "comments",
  start_chars_hint: ["("]
});

// The order of tokens is important
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

const MacroLexer = new Lexer(allTokens);

export function lex(inputText: string): LexerResult {
  const lexingResult = MacroLexer.tokenize(inputText);

  // if (lexingResult.errors.length > 0) {
  //   throw Error("Sad Sad Panda, lexing errors detected");
  // }

  return lexingResult;
}

export default MacroLexer;
