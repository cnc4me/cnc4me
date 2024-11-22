import type { MacroLexerError } from "../errors/lexer";
import type { MacroParserError } from "../errors/parser";
import type { MacroInterpreter } from "../MacroInterpreter";

export interface MacroRuntimeInitOptions {
  // autoExec: boolean;
  preloadInput: string;
}

export interface ProgramLoadOptions {
  setActive: boolean;
}

export type MacroCombinedError = MacroLexerError | MacroParserError;

export interface RuntimeOutput {
  beginExec: Date;
  // errors: RuntimeErrors[];
  result: ReturnType<MacroInterpreter["program"]>;
}

export interface RuntimeEvents {
  close: undefined; // No arg event
  error: MacroCombinedError;
}
