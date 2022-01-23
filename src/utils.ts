import { ILexingError, ILexingResult, Rule } from "chevrotain";

import { interpreter } from "./MacroInterpreter";
import MacroLexer from "./MacroLexer";
import MacroParser, { parser } from "./MacroParser";

type WithLexingErrors<T> = T & {
  lexErrors: ILexingError[];
};

interface IParsingResult {
  parser: MacroParser;
  lexResult: ILexingResult;
}

/**
 * Call `getGAstProductions()` from our MacroParser
 */
export function getGAstProductions(): Record<string, Rule> {
  return parser.getGAstProductions();
}

export function lex(inputText: string): ILexingResult {
  return MacroLexer.tokenize(inputText);
}

export function parse(text: string): WithLexingErrors<IParsingResult> {
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
  const { parser, lexResult, lexErrors } = parse(text);

  const cst = parser.program();

  const value = interpreter.visit(cst);

  return {
    value,
    lexResult,
    parseErrors: parser.errors
  };
}
