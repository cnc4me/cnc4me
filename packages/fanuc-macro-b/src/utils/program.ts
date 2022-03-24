import { ErrorsAndResultOf, InterpretedProgram } from "../types";
import { createToolchain } from "./createToolchain";

/**
 * Analyze a text in the context of being a valid NC program
 */
export function program(input: string): ErrorsAndResultOf<InterpretedProgram> {
  const { parser, lexer, interpreter } = createToolchain();

  const { tokens, errors } = lexer.tokenize(input);

  parser.input = tokens;

  const cst = parser.program();

  const result = interpreter.visit(cst) as InterpretedProgram;

  return {
    result,
    lexingErrors: errors,
    parseErrors: parser.errors
  };
}
