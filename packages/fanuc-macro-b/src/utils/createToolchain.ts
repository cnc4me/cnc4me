import { CstNode } from "chevrotain";

import { MacroInterpreter, MacroLexer, MacroParser } from "../lib";
import { MacroToolchainOptions } from "../types";

const lexer = new MacroLexer();
const parser = new MacroParser();
const interpreter = new MacroInterpreter();

export function createToolchain(options?: MacroToolchainOptions) {
  if (options) {
    if (options?.autoExec && options?.preloadInput) {
      const { errors, tokens } = lexer.tokenize(options.preloadInput);

      if (errors) {
        throw errors;
      }

      parser.input = tokens;
    }
  }

  function withParser<R>(cb: (parserInstance: MacroParser) => CstNode) {
    const cst = cb(parser);

    return interpreter.visit(cst) as R;
  }

  return {
    lexer,
    parser,
    interpreter,
    withParser
  };
}
