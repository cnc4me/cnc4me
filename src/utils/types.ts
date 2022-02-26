import { ILexingError, ILexingResult } from "chevrotain";
import { MacroParser } from "@cnc4me/fanuc-macro-b";

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
  setValue: (value: number) => this;
}
