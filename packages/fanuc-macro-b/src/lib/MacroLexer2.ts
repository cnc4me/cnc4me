import { type ILexingResult, Lexer } from "chevrotain";

import { tokenSet } from "./Tokens/token-set";

export class MacroLexer {
  private lexer: Lexer;
  private input!: string;
  private result!: ILexingResult;

  constructor() {
    this.lexer = new Lexer(tokenSet);
  }

  get groups() {
    return this.result.groups;
  }

  get tokens() {
    return this.result.tokens;
  }

  get errors() {
    return this.result.errors;
  }

  get lexerDefinitionErrors() {
    return this.lexer.lexerDefinitionErrors;
  }

  tokenize(text: string, initialMode?: string) {
    this.input = text;
    this.result = this.lexer.tokenize(this.input, initialMode);
    return this.result;
  }
}

export const lexer = new MacroLexer();
