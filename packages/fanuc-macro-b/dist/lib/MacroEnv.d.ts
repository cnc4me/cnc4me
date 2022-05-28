import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";
export declare class MacroEnv {
    private _mem;
    private _lexer;
    private _parser;
    private _interpreter;
    get Lexer(): MacroLexer;
    get Parser(): MacroParser;
    get Interpreter(): MacroInterpreter;
    get Memory(): MacroMemory;
    constructor();
}
