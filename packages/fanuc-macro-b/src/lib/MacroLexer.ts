import { Lexer } from "chevrotain";

import { lexer as debug } from "./debuggers";
import { allTokens } from "./Tokens/allTokens";

export class MacroLexer extends Lexer {
  constructor() {
    super(allTokens);

    // debug(`initializing lexer with ${allTokens.length} tokens`);
  }
}

export const lexer = new MacroLexer();
