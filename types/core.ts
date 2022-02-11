import { ILexingError, ILexingResult } from "chevrotain";
import type * as MonacoNs from "monaco-editor";

import MacroParser from "../src/MacroParser";

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

export type StandaloneEditor = MonacoNs.editor.IStandaloneCodeEditor;
