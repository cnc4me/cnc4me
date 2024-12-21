import type { MacroLexerError } from "../errors/lexer";
import type { MacroParserError } from "../errors/parser";

export interface ProgramLoadOptions {
  setActive: boolean;
  programNumber?: number;
}

export type MacroCombinedError = MacroLexerError | MacroParserError;

export interface RuntimeOutput<T> {
  // errors: RuntimeErrors[];
  result: T;
  timing: number;
}
