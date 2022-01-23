import { createToken, Lexer } from "chevrotain";

import {
  AdditionOperator,
  MultiplicationOperator,
  NumericValue
} from "./categories";
import { matchProgramNumber } from "./matchers";

export const Plus = createToken({
  name: "Plus",
  pattern: "+",
  categories: AdditionOperator
});

export const Minus = createToken({
  name: "Minus",
  pattern: "-",
  categories: AdditionOperator
});

export const Divide = createToken({
  name: "Divide",
  pattern: "/",
  categories: MultiplicationOperator
});

export const Product = createToken({
  name: "Product",
  pattern: "*",
  categories: MultiplicationOperator
});

export const Integer = createToken({
  name: "Integer",
  pattern: /\d+/,
  categories: NumericValue
});

export const Decimal = createToken({
  name: "Decimal",
  // Borrowed this regex https://stackoverflow.com/a/13252134
  pattern: /(?=\d*[.])([0-9]+\.?[0-9]*|\.[0-9]+)/,
  longer_alt: Integer,
  categories: NumericValue
});

export const Var = createToken({
  name: "Var",
  pattern: "#"
});

export const Equals = createToken({
  name: "Equals",
  pattern: "="
});

export const Percent = createToken({
  name: "Percent",
  pattern: "%"
});

export const Dot = createToken({
  name: "Dot",
  pattern: "."
});

export const Comma = createToken({
  name: "Comma",
  pattern: ","
});

export const Newline = createToken({
  name: "Newline",
  pattern: "\n"
});

export const Address = createToken({
  name: "Address",
  pattern: /[A-Z]/
});

// export const Gcode = createToken({
//   name: "G_Code",
//   pattern: /G\d+(\.\d)?/,
//   longer_alt: Address
// });

// export const Mcode = createToken({
//   name: "M_Code",
//   pattern: /M\d+(\.)?/,
//   longer_alt: Address
// });

export const LineNumber = createToken({
  name: "LineNumber",
  pattern: /N\d+/,
  longer_alt: Address
});

export const ProgramNumber = createToken({
  name: "ProgramNumber",
  // pattern: /[O|:](\d+)/,
  pattern: matchProgramNumber,
  longer_alt: Address
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

/**
 * Skipped tokens
 */
export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /[\s\t\r]+/,
  group: Lexer.SKIPPED
});

/**
 * Comments as a whole token
 */
export const Comment = createToken({
  name: "Comment",
  pattern: /\(\s*(.+?)\s*\)/,
  group: "comments",
  start_chars_hint: ["("]
});
