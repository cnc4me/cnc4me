import type { InsightCollection } from "../lib";
import type { InterpretedProgram, ParsingErrors } from "../types";
import { createToolchain } from "./createToolchain";

interface ProgramAnalisys {
  result: InterpretedProgram;
  insights: InsightCollection;
  errors: ParsingErrors;
}

/**
 * Analyze a text in the context of being a valid NC program
 */
export function program(input: string): ProgramAnalisys {
  const { parser, interpreter } = createToolchain({ preloadInput: input });

  const cst = parser.program();

  const result = interpreter.visit(cst) as InterpretedProgram;

  return {
    result,
    insights: interpreter.Insights,
    errors: parser.errors
  };
}
