import { Lexer } from "chevrotain";

import { tokenSet } from "./Tokens/token-set";

export class MacroLexer extends Lexer {
  errors: any;
  constructor() {
    super(tokenSet);

    // debug(`initializing lexer with ${allTokens.length} tokens`);
  }
}

export const lexer = new MacroLexer();
