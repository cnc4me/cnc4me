import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroParser } from "./MacroParser";

import type { ParsedLineData } from "./types";

class FanucMacroB {
  private _lexer: MacroLexer;
  private _parser: MacroParser;
  private _interpreter: MacroInterpreter;

  constructor() {
    this._lexer = new MacroLexer();
    this._parser = new MacroParser();
    this._interpreter = new MacroInterpreter();
  }

  eval(input: string): EvalResult {
    const tokens = this.tokenize(input);
    this._parser.setInput(tokens);
    const cst = this._parser.lines();
    return {
      error: null,
      result: this._interpreter.lines(cst.children)
    };
  }

  tokenize(input: string) {
    return this._lexer.tokenize(input);
  }
}

const instance = new FanucMacroB();
export default instance;

type EvalResult = {
  error: Error[] | null;
  result: ParsedLineData[];
};
