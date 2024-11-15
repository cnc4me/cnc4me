import { MarcoToolchain } from "../lib";

import type { InsightCollection } from "../lib";
import type { InterpretedProgram, RuntimeError } from "../types";

interface ProgramAnalisys {
  result: InterpretedProgram;
  errors: RuntimeError[];
  insights: InsightCollection;
}

/**
 * Analyze a text in the context of being a valid NC program
 */
export function program(preloadInput: string): ProgramAnalisys {
  const { runtime } = MarcoToolchain.create({ preloadInput });

  const cst = runtime.Parser.program();

  const result = runtime.Interpreter.visit(cst) as InterpretedProgram;

  return {
    result,
    errors: runtime.getErrors(),
    insights: runtime.Interpreter.Insights
  };
}
