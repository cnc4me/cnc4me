import { Lexer } from "chevrotain";

import { TOKEN_VOCABULARY } from "./lib/tokens";

import type { IMacroBase } from "./types";
import type { ILexingError, ILexingResult, IToken } from "chevrotain";

export class MacroLexer implements IMacroBase<ILexingError> {
  private _lexer: Lexer;
  private input!: string;
  private _result!: ILexingResult;

  static parseForTokens(input: string): IToken[] {
    const lexer = new MacroLexer();
    const { errors, tokens } = lexer.tokenize(input);

    if (errors) {
      throw new Error(errors[0].message);
    }

    return tokens;
  }

  constructor() {
    this._lexer = new Lexer(TOKEN_VOCABULARY);
  }

  tokenize(text: string, initialMode?: string) {
    this.input = text;
    this._result = this._lexer.tokenize(this.input, initialMode);
    return this._result;
  }

  get definitionErrors() {
    return this._lexer.lexerDefinitionErrors;
  }

  get errors() {
    return this._result?.errors;
  }

  get groups() {
    return this._result?.groups;
  }

  get tokens() {
    return this._result?.tokens;
  }

  get hasErrors() {
    return this._result?.errors.length > 0;
  }

  getErrors() {
    return this._result.errors;
  }

  getResult(): Omit<ILexingResult, "errors"> {
    const { groups, tokens } = this._result;
    return { groups, tokens };
  }
}
