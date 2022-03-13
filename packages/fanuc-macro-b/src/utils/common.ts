/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IToken } from "chevrotain";

import { lexer, parser } from "../lib";
import { ParsingResultWithLexingErrors } from "../types";
import { unbox } from "./generics";
import { interpret } from "./interpret";

/**
 * Return the image property from a possible token
 */
export function getImage(token: IToken | IToken[]) {
  return unbox(token).image;
}

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

/**
 * Sugar method to search for valid gcode lines
 */
export function evaluate(text: string) {
  return interpret(text, "lines");
}
