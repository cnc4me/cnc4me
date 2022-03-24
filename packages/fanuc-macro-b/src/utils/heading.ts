import type { MacroInterpreter } from "../lib/MacroInterpreter";
import type { ErrorsAndResultOf } from "../types";
import { HeadingCstNode } from "../types/fanuc";
import { createToolchain } from "./createToolchain";

type InterpretedProgramHeader = ReturnType<MacroInterpreter["ProgramNumberLine"]>;

/**
 * Analyze string a valid NC program identifier
 */
export function heading(input: string): ErrorsAndResultOf<InterpretedProgramHeader> {
  const { parser, lexer, interpreter } = createToolchain();

  const { tokens, errors } = lexer.tokenize(input);

  parser.input = tokens;

  const cst = parser.heading() as HeadingCstNode;

  const result = interpreter.visit(cst);

  return {
    result,
    lexingErrors: errors,
    parseErrors: parser.errors
  };
}
