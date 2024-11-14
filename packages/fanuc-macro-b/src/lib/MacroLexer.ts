import { Lexer } from "chevrotain";

import { allTokens } from "./Tokens";

export class MacroLexer extends Lexer {
  constructor() {
    super(allTokens);

    // debug(`initializing lexer with ${allTokens.length} tokens`);
  }
}

export const lexer = new MacroLexer();
