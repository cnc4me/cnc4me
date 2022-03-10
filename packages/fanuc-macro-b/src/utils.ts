import { ILexingResult, IToken } from "chevrotain";

import { interpreter } from "./lib/MacroInterpreter";
import { lexer } from "./lib/MacroLexer";
import { parser } from "./lib/MacroParser";
import { ParsingResultWithLexingErrors } from "./types";

export function degreeToRadian(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function radianToDegree(radians: number): number {
  return (180 / Math.PI) * radians;
}

export function unbox<T>(arr: T | T[]): T {
  return Array.isArray(arr) ? arr[0] : arr;
}

/**
 * Return the image property from a possible token
 */
export function getImage(token: IToken | IToken[]) {
  return unbox(token).image;
}

/**
 * Tokenize a block of text
 */
export function tokenize(inputText: string): ILexingResult {
  return lexer(inputText);
}

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

/**
 * Run the full interpreter and generate CST
 */
export function interpret(text: string, rule: string) {
  const { parser, lexResult } = parse(text);

  // @ts-expect-error blah
  const cst = parser[rule]();

  const result = interpreter.visit(cst);

  return {
    result,
    parser,
    lexResult,
    interpreter,
    parseErrors: parser.errors,
    macros: interpreter.getMacros()
  };
}

/**
 * Sugar method to search for valid gcode lines
 */
export function evaluate(text: string) {
  return interpret(text, "lines");
}

/**
 * Sugar method to search for a valid program.
 *
 * A valid program is any valid lines, wrapped with `%`
 * as the first and last lines. A program number is
 * required as well as the second line.
 */
export function validate(text: string) {
  return interpret(text, "program");
}
