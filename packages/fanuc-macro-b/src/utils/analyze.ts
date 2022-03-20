import { interpreter } from "../lib";
import type { ProgramAnalysis, ProgramInterpreterReturn } from "../types";
import { ProgramCstNode } from "../types/fanuc";
import { parse } from "./parse";

/**
 * Analyze a text in the context of being a valid NC program
 */
export function analyze(text: string): ProgramAnalysis {
  const { lexingErrors, parser } = parse(text);

  const cst = parser.program() as ProgramCstNode;

  const result = interpreter.visit(cst) as ProgramInterpreterReturn;

  return {
    result,
    lexingErrors,
    parseErrors: parser.errors
  };
}
