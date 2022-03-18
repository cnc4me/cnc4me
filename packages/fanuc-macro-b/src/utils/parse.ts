import { parser } from "../lib";
import { ParsingResultWithLexingErrors } from "../types";
import { tokenize } from "./common";

/**
 * Parse a given block of text
 */
export function parse(text: string): ParsingResultWithLexingErrors {
  const lexResult = tokenize(text);

  parser.input = lexResult.tokens;

  return {
    parser,
    lexResult,
    lexErrors: lexResult.errors
  };
}
