import { MacroLexer } from "../src";

const lexer = new MacroLexer(`ABS[-5]`);

const tokens = lexer.tokenize();

console.log(tokens);
