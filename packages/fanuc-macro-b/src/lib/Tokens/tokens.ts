import { createToken, Lexer } from "chevrotain";

import { NumericValue } from "./categories";
import { matchProgramNumber } from "./matchers";

export const Address = createToken({
  name: "Address",
  pattern: /[A-F][H-L][O-Z]/
});

export const Gcode = createToken({
  name: "G_Code",
  pattern: /G\d+(\.\d)?/,
  longer_alt: Address
});

export const Tcode = createToken({
  name: "T_Code",
  pattern: /T\d+/,
  longer_alt: Address
});

export const Mcode = createToken({
  name: "M_Code",
  pattern: /M\d+(\.)?/,
  longer_alt: Address
});

export const LineNumber = createToken({
  name: "LineNumber",
  pattern: /N\d+/,
  longer_alt: Address
});

export const ProgramNumber = createToken({
  name: "ProgramNumber",
  // pattern: /[O|:](\d+)/,
  pattern: matchProgramNumber,
  longer_alt: Address,
  line_breaks: true
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

export const BuiltinFunctions = createToken({
  name: "BuiltinFunctions",
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
