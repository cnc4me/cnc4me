import type { ILexingError, IRecognitionException, IToken } from "chevrotain";

import type { AddressInsight } from "../lib";
import type { NcAddress } from "../lib/NcAddress";
import { createToolchain } from "../utils";

export type OneOrMany<T> = T | T[];

export type ErrorHandler<E, R> = (err: E, result: R) => void;

export type WithInput<T, I> = T & { input: I };

export type WithResult<T, R> = T & { result: R };

export type WithTools<T, K> = T & Pick<ReturnType<typeof createToolchain>, K>;

export type LexingErrors = ILexingError[];

export type ParsingErrors = IRecognitionException[];

export type EvalErrors = LexingErrors | ParsingErrors;

export type MacroInsights = Record<string, AddressInsight>;

export interface ProgramIdentifier {
  programTitle: string;
  programNumber: number;
}

export interface InterpretedLines {
  result: ParsedLineData[];
}

export interface InterpretedProgram extends ProgramIdentifier {
  lines: ParsedLineData[];
}

export interface VariableRegister {
  register: number;
  value: number;
}

export interface ParsedLineData {
  N: number;
  gCodes: IToken[];
  mCodes: IToken[];
  comments: string[];
  addresses: NcAddress[];
  gCodeMap: Record<string, boolean>;
  mCodeMap: Record<string, boolean>;
}

export interface ParsedAddressData {
  image: string;
  value: number;
  address: string;
  isNegative: boolean;
}
