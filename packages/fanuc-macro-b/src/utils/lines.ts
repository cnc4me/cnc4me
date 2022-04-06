import type { MacroInterpreter, MacroParser } from "../lib";
import type { InterpretedLines } from "../types";
import { createToolchain } from "./createToolchain";

interface LinesOutput {
  parser: MacroParser;
  result: InterpretedLines;
  interpreter: MacroInterpreter;
}

/**
 * Analyze a text in the context of being a valid NC program
 */
export function lines(input: string): LinesOutput {
  const { parser, interpreter } = createToolchain({ preloadInput: input });

  const cst = parser.lines();

  const result = interpreter.visit(cst) as InterpretedLines;

  return {
    result,
    parser,
    interpreter
  };
}
