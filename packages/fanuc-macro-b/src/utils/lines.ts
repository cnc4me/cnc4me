import { ErrorsAndResultOf, InterpretedLines } from "../types";
import { createToolchain } from "./createToolchain";

/**
 * Analyze a text in the context of being a valid NC program
 */
export function lines(input: string): ErrorsAndResultOf<InterpretedLines> {
  const { parser, lexer, interpreter } = createToolchain();

  const { tokens, errors } = lexer.tokenize(input);

  parser.input = tokens;

  const cst = parser.lines();

  const result = interpreter.visit(cst) as InterpretedLines;

  return {
    result,
    lexingErrors: errors,
    parseErrors: parser.errors
  };
}
