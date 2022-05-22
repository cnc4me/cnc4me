import { env as debug } from "./debuggers";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";

/*
 * MacroEnv Class is a formal instance of all the modules
 */
export class MacroEnv {
  private _mem: MacroMemory;
  private _lexer: MacroLexer;
  private _parser: MacroParser;
  private _interpreter: MacroInterpreter;

  get Lexer(): MacroLexer {
    return this._lexer;
  }

  get Parser(): MacroParser {
    return this._parser;
  }

  get Interpreter(): MacroInterpreter {
    return this._interpreter;
  }

  get Memory(): MacroMemory {
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
