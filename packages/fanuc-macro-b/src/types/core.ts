import type { ILexingError, IRecognitionException } from "chevrotain";

import type { MacroInterpreter, MacroLexer, MacroParser } from "../lib";
import type { ParsedLineData } from "./parsed";

export type OneOrMany<T> = T | T[];

export type WithInput<T> = T & { input: string };

export type ErrorHandler<E, R> = (err: E, result: R) => void;

export type LexingErrors = ILexingError[];

export type ParsingErrors = IRecognitionException[];

export type EvalErrors = LexingErrors | ParsingErrors;

export type AnalyzedProgram = WithInput<InterpretedProgram>;

export type ProgramRecords = Record<string, AnalyzedProgram>;

export type ProgramAnalysis = ErrorsAndResultOf<ParsedProgramResult>;

export type InterpretedLines = ReturnType<MacroInterpreter["lines"]>;

export type InterpretedProgram = ReturnType<MacroInterpreter["program"]>;

export type TopLevelParserRules = "program" | "lines" | "heading";

export interface ErrorsAndResultOf<T> {
  result: T;
  parseErrors: ParsingErrors;
  lexingErrors: LexingErrors;
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

export interface MacroToolchain {
  lexer: MacroLexer;
  parser: MacroParser;
  interpreter: MacroInterpreter;
}

export interface MacroToolchainOptions {
  // autoExec: boolean;
  preloadInput: string;
}
