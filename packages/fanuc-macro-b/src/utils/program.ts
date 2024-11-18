import { MacroRuntime } from "../MacroRuntime";

import type { InsightCollection } from "../lib";
import type { InterpretedProgram, RuntimeError } from "../types";

interface ProgramAnalisys {
  result: InterpretedProgram;
  errors: RuntimeError[];
  insights: InsightCollection;
}

/**
 * Analyze a text in the context of being a valid NC program
 *
 * @deprecated use MacroRuntime in some way
 */
export function program(preloadInput: string): ProgramAnalisys {
  const runtime = new MacroRuntime();
  runtime.loadParser(preloadInput);
  const cst = runtime.Parser.program();

  const result = runtime.Interpreter.visit(cst) as InterpretedProgram;

  return {
    result,
    errors: runtime.getErrors(),
    insights: runtime.Interpreter.Insights
  };
}
