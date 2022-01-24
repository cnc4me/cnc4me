import { ILexingResult, IToken } from "chevrotain";

import { ParsingResultWithLexingErrors } from "../types/core";
import { interpreter } from "./MacroInterpreter";
import MacroLexer from "./MacroLexer";
import { parser } from "./MacroParser";
import { Integer } from "./tokens/tokens";

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
 * Running the full interpreter and generate CST
 */
export function interpret(text: string) {
  const { parser, lexResult } = parse(text);

  const cst = parser.program();

  const value = interpreter.visit(cst);

  return {
    value,
    lexResult,
    parseErrors: parser.errors
  };
}

export function unboxToken(token: IToken | IToken[]) {
  return Array.isArray(token) ? token[0] : token;
}

export function getImage(token: IToken | IToken[]) {
  return unboxToken(token).image;
}
