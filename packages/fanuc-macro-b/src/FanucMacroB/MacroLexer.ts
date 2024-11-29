import { Lexer } from "chevrotain";

import { InputUndefined, LexingError } from "../errors/lexer";
import { FANUC_MACRO_B_GRAMMAR } from "./FanucMacroB.grammar";

import type { ErrorProducer } from "../types";
import type { ILexerDefinitionError, ILexingResult, IToken } from "chevrotain";

const _lexer = new Lexer(FANUC_MACRO_B_GRAMMAR);

export class MacroLexer implements ErrorProducer<LexingError> {
  #instance: Lexer;
  #result!: ILexingResult;
  #input = "";

  constructor() {
    this.#instance = _lexer;
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

  getErrors(): LexingError[] {
    return this.#result.errors.map(err => new LexingError(err));
  }

  getDefinitionErrors(): ILexerDefinitionError[] {
    return this.#instance.lexerDefinitionErrors;
  }

  reset(): void {
    this.#input = "";
    this.#result = { errors: [], groups: {}, tokens: [] };
  }
}
