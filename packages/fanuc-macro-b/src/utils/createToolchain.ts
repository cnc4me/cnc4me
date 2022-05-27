import { ILexingError } from "chevrotain";

import { MacroInterpreter, MacroLexer, MacroParser } from "../lib";
import { MacroToolchainOptions } from "../types";

export function createToolchain(options?: MacroToolchainOptions) {
  const errors: ILexingError[] = [];
  const lexer = new MacroLexer();
  const parser = new MacroParser();
  const interpreter = new MacroInterpreter();

  if (options?.preloadInput) {
    const { errors, tokens } = lexer.tokenize(options.preloadInput);

    if (errors) {
      errors.push(...errors);
    }

    parser.input = tokens;
  }

  return {
    errors,
    lexer,
    parser,
    interpreter
  };
}
