import { Lexer } from "chevrotain";
import { InputUndefined, LexingError } from "../errors/lexer";
import { Debuggers } from "../utils/debug";
import { FANUC_MACRO_B_GRAMMAR } from "./parser/MacroGrammar";
import type { ILexerDefinitionError, ILexingResult, IToken } from "chevrotain";
import type { ErrorProducer } from "../types";

export class MacroLexer implements ErrorProducer<LexingError> {
  #instance: Lexer;
  #result: ILexingResult;
  #debug = Debuggers.Lexer;

  constructor() {
    this.#debug("initializing");
    this.#instance = new Lexer(FANUC_MACRO_B_GRAMMAR);
    this.#result = {
      tokens: [],
      errors: [],
      groups: {},
    };
  }

  get hasTokens() {
    return this.#result.tokens.length > 0;
  }

  get hasErrors() {
    return this.#result.errors.length > 0;
  }

  get definitionErrors(): ILexerDefinitionError[] {
    return this.#instance.lexerDefinitionErrors;
  }

  tokenize(input: string, initialMode?: string): IToken[] {
    if (!input) {
      throw new InputUndefined();
    }
    this.#result = this.#instance.tokenize(input, initialMode);
    this.#debug("tokenizing complete");
    this.#debug("errors:", this.#result.errors.length);
    this.#debug("tokens:", this.#result.tokens.length);
    this.#debug("groups:", Object.keys(this.#result.groups).length);
    return this.#result.tokens;
  }

  getGroups(): ILexingResult["groups"] {
    return this.#result?.groups;
  }

  getTokens(): IToken[] {
    return this.#result?.tokens;
  }

  getErrors(): LexingError[] {
    return this.#result.errors.map((err) => new LexingError(err));
  }

  reset(): void {
    this.#debug("resetting");
    this.#result = {
      tokens: [],
      errors: [],
      groups: {},
    };
  }
}
