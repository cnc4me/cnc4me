import { Lexer } from "chevrotain";

import { allTokens } from "./Tokens/allTokens";

const MacroLexer = new Lexer(allTokens);

export { MacroLexer };
