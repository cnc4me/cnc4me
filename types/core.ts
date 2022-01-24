import { ILexingError, ILexingResult } from "chevrotain";

import MacroParser from "../src/MacroParser";

export interface ParsingResultWithLexingErrors extends IParsingResult {
  lexErrors: ILexingError[];
}

export interface IParsingResult {
  parser: MacroParser;
  lexResult: ILexingResult;
}
