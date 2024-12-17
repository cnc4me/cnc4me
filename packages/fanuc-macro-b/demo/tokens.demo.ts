import { MacroLexer } from "../src";

const lexer = new MacroLexer();

lexer.setInput(`ABS[-5]`);

const tokens = lexer.tokenize();

console.log(tokens);
