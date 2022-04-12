import { ILexingError } from "chevrotain";

import { MacroEnv } from "../lib/MacroEnv";
import { MacroToolchainOptions } from "../types";

export function createToolchain(options?: MacroToolchainOptions) {
  const errors: ILexingError[] = [];
  const env = new MacroEnv();

  if (options?.preloadInput) {
    const { errors, tokens } = env.Lexer.tokenize(options.preloadInput);

    if (errors) {
      errors.push(...errors);
    }

    env.Parser.input = tokens;
  }

  return {
    errors,
    lexer: env.Lexer,
    parser: env.Parser,
    interpreter: env.Interpreter
  };
}
