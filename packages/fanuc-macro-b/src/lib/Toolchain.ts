import { ILexingError } from "chevrotain";

import { MacroRuntime } from "./MacroRuntime";

export interface MacroToolchainOptions {
  // autoExec: boolean;
  preloadInput: string;
}

/**
 * @TODO what class uses this?
 * @TODO is this the same sorta thing as MacroRuntime? housing all the bits of the "toolchain?"
 */
function create(runtime: MacroRuntime, options?: MacroToolchainOptions) {
  const errors: ILexingError[] = [];

  if (options?.preloadInput) {
    const { errors, tokens } = runtime.Lexer.tokenize(options.preloadInput);

    if (errors) {
      errors.push(...errors);
    }

    runtime.setParserInput(tokens);
  }

  return { runtime, errors };
}

export const Toolchain = { create };

export default Toolchain;
