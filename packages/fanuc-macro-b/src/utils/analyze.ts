import { interpreter, parser } from "../lib";
import type { ValidationResult } from "../types";
import { tokenize } from "./common";

/**
 * Analyze a text in the context of being a valid NC program
 */
export function analyze(text: string): ValidationResult {
  const lexResult = tokenize(text);

  parser.input = lexResult.tokens;

  const cst = parser.program();

  const result = interpreter.visit(cst);

  const err = parser.errors.length > 0 ? parser.errors : [];

  return { err, result, tokens: lexResult.tokens };
}
