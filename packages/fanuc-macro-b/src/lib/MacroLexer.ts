import { Lexer } from "chevrotain";

import { lexer as debug } from "./debuggers";
import { allTokens } from "./Tokens/allTokens";

export class MacroLexer extends Lexer {
  constructor() {
    debug(`initializing lexer with ${allTokens.length} tokens`);
    super(allTokens);
  }
}

export const lexer = new MacroLexer();
