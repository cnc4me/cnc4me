import { createToken, Lexer } from "chevrotain";
import { NumericValue } from "./categories";
import { matchProgramNumber } from "./matchers";
export const Address = createToken({
    name: "Address",
    pattern: /[A-Z]/
});
export const Gcode = createToken({
    name: "G_Code",
    pattern: /G\d+(\.\d+)?/,
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
    pattern: matchProgramNumber,
    line_breaks: true
    // pattern: /[O|:](\d+)/,
    // longer_alt: Address
});
export const Integer = createToken({
    name: "Integer",
    pattern: /\d+/,
    categories: NumericValue
});
// Borrowed the regex from https://stackoverflow.com/a/13252134
export const Decimal = createToken({
    name: "Decimal",
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
    start_chars_hint: ["("]
});
