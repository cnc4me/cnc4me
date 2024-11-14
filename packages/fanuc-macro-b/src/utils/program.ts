import { IRecognitionException } from "chevrotain";

import { createToolchain } from "./createToolchain";

import type { InsightCollection } from "../lib";
import type { InterpretedProgram } from "../types";

interface ProgramAnalisys {
  result: InterpretedProgram;
  insights: InsightCollection;
  errors: IRecognitionException[];
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
