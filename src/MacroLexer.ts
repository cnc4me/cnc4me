import { Lexer } from "chevrotain";

import { allTokens } from "./tokens/allTokens";

const MacroLexer = new Lexer(allTokens);

export default MacroLexer;
