import { isRecognitionException } from "chevrotain";

import type { ILexingError } from "chevrotain";

export const isParsingError = isRecognitionException;

export function isLexingError(obj: unknown): obj is ILexingError {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const requiredKeys: Array<keyof ILexingError> = [
    "offset",
    "line",
    "column",
    "length",
    "message"
  ];

  return requiredKeys.every(key => key in obj);
}
