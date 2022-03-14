import type { ILexingError, ILexingResult, IRecognitionException, IToken } from "chevrotain";

import type { MacroParser } from "../lib/MacroParser";

export type ParseErrors = null | IRecognitionException[];

export type ProgramRecords = Record<string, AnalyzedProgram>;

export interface AnalyzedProgram extends ProgramIdentifier {
  err: ParseErrors;
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

export interface ValidationResult {
  tokens: IToken[];
  err: ParseErrors;
  result: MacroProgramAnalysis;
}

export interface ProgramIdentifier {
  programNumber: string | number;
  programTitle: string;
}

export interface MacroProgramAnalysis extends ProgramIdentifier {
  [K: string]: string | number;
}
