import type { MacroLexerError } from "../errors/lexer";
import type { MacroParserError } from "../errors/parser";
import type { InterpretedProgram } from "./interfaces";

export interface MacroRuntimeInitOptions {
  // autoExec: boolean;
  preloadInput: string;
}

export interface ProgramLoadOptions {
  setActive: boolean;
}

export type MacroCombinedError = MacroLexerError | MacroParserError;

export interface RuntimeOutput {
  // errors: RuntimeErrors[];
  result: InterpretedProgram;
  timing: number;
}

export type RuntimeEvents = {
  error: Error;
};
