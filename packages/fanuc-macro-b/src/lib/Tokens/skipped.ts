import { createToken, Lexer } from "chevrotain";

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
