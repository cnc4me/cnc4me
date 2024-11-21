import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";

import type { ParsedLineData } from "./types";

/**
 * This class wraps the functionality for:
 * tokenizing -> parsing -> interpreting
 */
export class FanucMacroB {
  lexer: MacroLexer;
  parser: MacroParser;
  memory: MacroMemory;
  interpreter: MacroInterpreter;

  constructor() {
    this.memory = new MacroMemory();
    this.lexer = new MacroLexer();
    this.parser = new MacroParser();
    this.interpreter = new MacroInterpreter({
      memory: this.memory
    });
  }

  get hasErrors() {
    return this.lexer.hasErrors || this.parser.hasErrors;
  }

  /**
   * Main method for invoking the interpreter
   */
  eval(input: string): EvalResult {
    const tokens = this.tokenize(input);
    this.parser.setInput(tokens);
    const cst = this.parser.lines();

    return {
      error: null,
      result: this.interpreter.lines(cst?.children)
    };
  }

  /**
   * Tokenize a string of gcode
   */
  tokenize(input: string) {
    return this.lexer.tokenize(input);
  }
}

type EvalResult = {
  error: Error[] | null;
  result: ParsedLineData[];
};
