import { CstElement, CstNode, ILexingResult, IToken } from "chevrotain";

import { ParsingResultWithLexingErrors } from "../types/core";
import { ProgramCstNode } from "../types/fanuc";
import { interpreter } from "./MacroInterpreter";
import MacroLexer from "./MacroLexer";
import { parser } from "./MacroParser";

export function unbox<T>(arr: T | T[]) {
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
export function lex(inputText: string): ILexingResult {
  return MacroLexer.tokenize(inputText);
}

/**
 * Parse a given block of text
 */
export function parse(text: string): ParsingResultWithLexingErrors {
  const lexResult = lex(text);

  parser.input = lexResult.tokens;

  return {
    parser,
    lexResult,
    lexErrors: lexResult.errors
  };
}

/**
 * Running the full interpreter searching for a valid program
 */
export function validate(text: string) {
  const { parser, lexResult } = parse(text);

  const cst = parser.program();

  const result = interpreter.visit(cst);

  return {
    result,
    lexResult,
    parseErrors: parser.errors
  };
}

/**
 * Running the full interpreter and generate CST
 */
export function interpret(text: string, rule: string) {
  const { parser, lexResult } = parse(text);

  const cst = parser[rule]();

  const result = interpreter.visit(cst);

  return {
    result,
    parser,
    interpreter,
    lexResult,
    parseErrors: parser.errors
  };
}
