import { Lexer } from "chevrotain";

import { InputUndefined } from "./errors";
import { FANUC_MACRO_B_GRAMMAR } from "./lib";

import type { IMacroBase } from "./types";
import type {
  ILexerDefinitionError,
  ILexingError,
  ILexingResult,
  IToken
} from "chevrotain";

export class MacroLexer implements IMacroBase<ILexingError> {
  #instance: Lexer;
  #result!: ILexingResult;
  #input = "";

  constructor(input?: string) {
    this.#instance = new Lexer(FANUC_MACRO_B_GRAMMAR);
    if (input) this.#input = input;
  }

  get hasErrors() {
    return this.#result?.errors.length > 0;
  }

  get hasDefinitionErrors() {
    return this.#instance.lexerDefinitionErrors.length > 0;
  }

  tokenize(text?: string, initialMode?: string): IToken[] {
    if (text) this.#input = text;
    if (this.#input === "") throw new InputUndefined();
    this.#result = this.#instance.tokenize(this.#input, initialMode);
    return this.#result.tokens;
  }

  reset(): void {
    this.#input = "";
    this.#result = { errors: [], groups: {}, tokens: [] };
  }

  /**
   * Load the Lexer with a string of input
   */
  setInput(input: string): void {
    this.#input = input;
  }

  getGroups(): ILexingResult["groups"] {
    return this.#result?.groups;
  }

  getTokens(): IToken[] {
    return this.#result?.tokens;
  }

  getErrors(): ILexingError[] {
    return this.#result.errors;
  }

  getDefinitionErrors(): ILexerDefinitionError[] {
    return this.#instance.lexerDefinitionErrors;
  }
}
