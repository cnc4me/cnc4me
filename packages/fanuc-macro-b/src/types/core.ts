import type { ILexingError, IRecognitionException, IToken } from "chevrotain";

import type { AddressInsight } from "../lib";
import type { NcAddress } from "../lib/NcAddress";
import { createToolchain } from "../utils";
import { PossibleG10LineValues } from "./g10";

export type OneOrMany<T> = T | T[];

export type ErrorHandler<E, R> = (err: E, result: R) => void;

export type WithInput<T, I> = T & { input: I };

export type WithResult<T, R> = T & { result: R };

export type MacroTools = ReturnType<typeof createToolchain>;

export type WithTools<T, K extends keyof MacroTools> = T & Pick<MacroTools, K>;

export type LexingErrors = ILexingError[];

export type ParsingErrors = IRecognitionException[];

export type EvalErrors = LexingErrors | ParsingErrors;

export type MacroInsights = Record<string, AddressInsight>;

export type LetterAddress =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "N"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

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
  /**
   * Parsed `N` line number (this is not the literal line, but explicit Nnnnn )
   */
  N: number;
  /**
   * Collection of all the `G` codes on the line
   */
  gCodes: IToken[];
  /**
   * Collection of all the `M` codes on the line
   */
  mCodes: IToken[];
  /**
   * Collection of all the ( comments ) found on the line
   */
  comments: string[];
  /**
   * Collection of all the non `G` & `M` codes on the line
   */
  addresses: NcAddress[];
  gCodeMap: Record<string, boolean>;
  mCodeMap: Record<string, boolean>;
  /**
   * Map of letter addresses and their parsed values
   */
  addressMap: Record<string, number>;
}

export interface ParsedAddressData {
  image: string;
  value: number;
  address: string;
  isNegative: boolean;
}
