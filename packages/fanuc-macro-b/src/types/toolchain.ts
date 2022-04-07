import type { MacroInterpreter, MacroLexer, MacroParser } from "../lib";

export interface MacroToolchain {
  lexer: MacroLexer;
  parser: MacroParser;
  interpreter: MacroInterpreter;
}

export interface MacroToolchainOptions {
  // autoExec: boolean;
  preloadInput: string;
}
