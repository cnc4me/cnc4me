import { ILexingError, ILexingResult } from "chevrotain";

import { MacroParser } from "../lib/MacroParser";

export type MacroVariables = Map<number, number>;

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
