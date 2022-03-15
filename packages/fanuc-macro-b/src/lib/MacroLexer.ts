import { Lexer } from "chevrotain";

import { allTokens } from "./Tokens/allTokens";

export class MacroLexer extends Lexer {
  static ALL_TOKENS = allTokens;

  constructor() {
    super(MacroLexer.ALL_TOKENS);
  }
}

export const lexer = new MacroLexer();
