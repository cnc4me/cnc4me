import { Lexer } from "chevrotain";

import { allTokens } from "./Tokens/allTokens";

export const MacroLexer = new Lexer(allTokens);

export const lexer = (code: string) => MacroLexer.tokenize(code);
