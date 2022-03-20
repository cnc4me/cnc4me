import type { ILexingError, IRecognitionException, IToken } from "chevrotain";

import type { MacroInterpreter, MacroLexer, MacroParser } from "../lib";

export type OneOrMany<T> = T | T[];

export type LexingErrors = ILexingError[];

export type ParseErrors = IRecognitionException[];

export type WithInput<T> = T & { input: string };

export type ErrorHandler<E, R> = (err: E, result: R) => void;

export type ProgramRecords = Record<string, ProgramAnalysis>;

export type ProgramInterpreterReturn = ReturnType<MacroInterpreter["program"]>;

export interface MacroTools {
  lexer: MacroLexer;
  parser: MacroParser;
  interpreter: MacroInterpreter;
}

export interface ProgramAnalysis {
  result: ParsedProgramResult;
  parseErrors: ParseErrors;
  lexingErrors: LexingErrors;
}

export interface ParsedLineData {
  N: number;
  gCodes: IToken[];
  mCodes: IToken[];
  comments: string[];
  addresses: ParsedAddressData[];
}

export interface ParsedAddressData {
  image: string;
  value: number;
  address: string;
  isNegative: boolean;
}

export interface ProgramIdentifier {
  programTitle: string;
  programNumber: number;
}

export interface WatcherValuePayload {
  prev: number;
  curr: number;
  register: number;
}

export interface ParsedProgramResult extends ProgramIdentifier {
  lines: ParsedLineData[];
}

export interface VariableRegister {
  register: number;
  value: number;
}

export interface ValidationResult {
  tokens: IToken[];
  err: ParseErrors;
  result: ParsedProgramResult;
}
