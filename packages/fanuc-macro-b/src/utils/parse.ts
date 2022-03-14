import { lexer, parser } from "../lib";
import { ParsingResultWithLexingErrors } from "../types";

/**
 * Parse a given block of text
 */
export function parse(text: string): ParsingResultWithLexingErrors {
  const lexResult = lexer(text);

  parser.input = lexResult.tokens;

  return {
    parser,
    lexResult,
    lexErrors: lexResult.errors
  };
}
