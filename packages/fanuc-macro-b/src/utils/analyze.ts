import { interpreter, lexer, parser } from "../lib";
import type { onParse } from "../types";

/**
 * Analyze a text in the context of being a valid NC program
 */
export function analyze(text: string, onParse: onParse): void {
  const lexResult = lexer(text);

  parser.input = lexResult.tokens;

  const cst = parser.program();

  const errors = parser.errors.length > 0 ? parser.errors : null;
  const result = interpreter.visit(cst);

  onParse(errors, result);
}
