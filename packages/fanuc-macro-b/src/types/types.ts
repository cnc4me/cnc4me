import type { ILexingError, IRecognitionException } from "chevrotain";

import type { AddressInsight } from "../lib";
import { createToolchain } from "../utils";

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
