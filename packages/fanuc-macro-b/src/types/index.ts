import type { ILexingError, ILexingResult, IRecognitionException, IToken } from "chevrotain";

import type { MacroParser } from "../lib/MacroParser";

export interface MacroProgram extends ILexingResult {
  input: string;
}

export interface ParsingResultWithLexingErrors extends IParsingResult {
  lexErrors: ILexingError[];
}

export interface IParsingResult {
  parser: MacroParser;
  lexResult: ILexingResult;
}

export interface VariableRegister {
  register: number;
  value: number;
  // setValue: (value: number) => this;
}

export interface ProgramIdentifier {
  programNumber: number;
  programTitle: string;
}

export interface MacroProgramAnalysis extends ProgramIdentifier {
  [K: string]: string | number;
}

export type MacroProgramLoaded = (err: null | ILexingError[], program: MacroProgram) => void;

export interface ValidationResult {
  tokens: IToken[];
  err: null | IRecognitionException[];
  result: MacroProgramAnalysis;
}
