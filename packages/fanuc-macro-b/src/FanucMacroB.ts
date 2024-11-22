import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroParser } from "./MacroParser";

import type { MacroLexerError } from "./errors/lexer";
import type { MacroParserError } from "./errors/parser";
import type { ErrorProducer, ParsedLineData } from "./types";
import type { IToken } from "chevrotain";

/**
 * This class wraps the functionality for:
 * tokenizing -> parsing -> interpreting
 * @todo use this instead of loading the MacroRuntime with the individual pieces
 */
export class FanucMacroB
  implements ErrorProducer<MacroLexerError | MacroParserError>
{
  lexer: MacroLexer;
  parser: MacroParser;
  interpreter: MacroInterpreter;

  constructor() {
    this.lexer = new MacroLexer();
    this.parser = new MacroParser();
    this.interpreter = new MacroInterpreter();
  }

  get memory() {
    return this.interpreter.getMemory();
  }

  /**
   * If either the {@link MacroLexer} or {@link MacroParser} encountered errors
   * then this property will be `true`
   */
  get hasErrors() {
    return this.lexer.hasErrors || this.parser.hasErrors;
  }

  /**
   * Tokenize a string of gcode
   */
  tokenize(input: string): IToken[] {
    return this.lexer.tokenize(input);
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

  getErrors() {
    return [
      ...this.lexer.getErrors(), //
      ...this.parser.getErrors() //
    ];
  }
}

type EvalResult = {
  error: Error[] | null;
  result: ParsedLineData[];
};
