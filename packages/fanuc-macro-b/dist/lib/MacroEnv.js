import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";
/*
 * MacroEnv Class is a formal instance of all the modules
 */
export class MacroEnv {
    _mem;
    _lexer;
    _parser;
    _interpreter;
    get Lexer() {
        return this._lexer;
    }
    get Parser() {
        return this._parser;
    }
    get Interpreter() {
        return this._interpreter;
    }
    get Memory() {
        return this._interpreter.Memory;
    }
    constructor() {
        // debug("initializing");
        this._mem = new MacroMemory();
        this._lexer = new MacroLexer();
        this._parser = new MacroParser();
        this._interpreter = new MacroInterpreter({
            memory: this._mem
        });
    }
}
