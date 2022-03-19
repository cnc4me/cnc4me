import { Lexer } from "chevrotain";

import { allTokens } from "./Tokens/allTokens";

export class MacroLexer extends Lexer {
  constructor() {
    super(allTokens);
  }
}

export const lexer = new MacroLexer();
