import { isRecognitionException } from "chevrotain";
import type { ILexingError, IRecognitionException } from "chevrotain";

export function isParsingError(obj: unknown): obj is IRecognitionException {
  return isRecognitionException(obj as IRecognitionException);
}

export function isLexingError(obj: unknown): obj is ILexingError {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const requiredKeys: Array<keyof ILexingError> = [
    "offset",
    "line",
    "column",
    "length",
    "message",
  ];

  return requiredKeys.every((key) => key in obj);
}
