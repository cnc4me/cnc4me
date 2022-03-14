import { interpreter, lexer, parser } from "../lib";
import type { ValidationResult } from "../types";

/**
 * Analyze a text in the context of being a valid NC program
 */
export function analyze(text: string): ValidationResult {
  const lexResult = lexer(text);

  parser.input = lexResult.tokens;

  const cst = parser.program();

  const err = parser.errors.length > 0 ? parser.errors : null;
  const result = interpreter.visit(cst);

  return { err, result, tokens: lexResult.tokens };
}
