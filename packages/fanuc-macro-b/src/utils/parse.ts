import { parser } from "../lib";
import { tokenize } from "./common";

/**
 * Parse a given block of text
 */
export function parse(text: string) {
  const { errors, tokens } = tokenize(text);

  parser.input = tokens;

  return {
    parser,
    lexingErrors: errors
  };
}
