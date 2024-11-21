import { Lexer } from "chevrotain";

import { TOKEN_VOCABULARY } from "./lib";

import type { MacroParser } from "./MacroParser";
import type { IMacroBase } from "./types";
import type {
  ILexerDefinitionError,
  ILexingError,
  ILexingResult,
  IToken
} from "chevrotain";

export class MacroLexer implements IMacroBase<ILexingError> {
  private _lexer: Lexer;
  private _input: string;
  private _result!: ILexingResult;

  /**
   * Create and run an instance of the {@link MacroLexer}
   */
  static run(input: string): IToken[] {
    const lexer = new MacroLexer();
    lexer.setInput(input);
    lexer.tokenize();
    if (lexer.hasErrors) throw new Error(lexer.getErrors()[0].message);
    return lexer.getTokens();
  }

  constructor() {
    this._input = "";
    this._lexer = new Lexer(TOKEN_VOCABULARY);
  }

  get hasErrors() {
    return this._result?.errors.length > 0;
  }

  get hasDefinitionErrors() {
    return this._lexer.lexerDefinitionErrors.length > 0;
  }

  tokenize(text?: string, initialMode?: string): IToken[] {
    this._input = text ?? "";
    this._result = this._lexer.tokenize(this._input, initialMode);
    return this._result.tokens;
  }

  /**
   * Load the Lexer with a string of input
   */
  setInput(input: string): void {
    this._input = input;
  }

  getGroups(): ILexingResult["groups"] {
    return this._result?.groups;
  }

  getTokens(): IToken[] {
    return this._result?.tokens;
  }

  getErrors(): ILexingError[] {
    return this._result.errors;
  }

  getDefinitionErrors(): ILexerDefinitionError[] {
    return this._lexer.lexerDefinitionErrors;
  }

  /**
   * Clear the input and result of the {@link MacroLexer}
   */
  reset(): void {
    this._input = "";
    this._result = { errors: [], groups: {}, tokens: [] };
  }
}
