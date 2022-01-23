import { ILexingResult, Rule } from "chevrotain";

import { interpreter } from "./MacroInterpreter";
import MacroLexer from "./MacroLexer";
import MacroParser, { parser } from "./MacroParser";

interface IParsingResult {
  parser: MacroParser;
  lexingResult: ILexingResult;
}

export function getGAstProductions(): Record<string, Rule> {
  return parser.getGAstProductions();
}

/**
 * Tokenization
 */
export function lex(inputText: string): ILexingResult {
  const lexingResult = MacroLexer.tokenize(inputText);

  // if (lexingResult.errors.length > 0) {
  //   throw Error("Sad Sad Panda, lexing errors detected");
  // }

  return lexingResult;
}

/**
 * Using the MacroParser, tokenizes a string and get back
 * an instance of the parser
 */
export function parse(text: string): IParsingResult {
  const lexingResult = lex(text);

  parser.input = lexingResult.tokens;

  return {
    parser,
    lexingResult
  };
}

/**
 * Running the full interpreter and generate CST
 */
export function interpret(text: string) {
  const { parser, lexingResult } = parse(text);

  const cst = parser.program();

  const value = interpreter.visit(cst);

  return {
    value,
    lexingResult,
    parseErrors: parser.errors
  };
}
