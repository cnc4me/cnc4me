import type { InterpretedLines, WithTools } from "../types";
import { createToolchain } from "./createToolchain";

/**
 * Run lines of text as gcode throught the {@link MacroInterpreter}
 */
export function lines(
  input: string
): WithTools<InterpretedLines, "parser" | "interpreter"> {
  const { parser, interpreter } = createToolchain({ preloadInput: input });

  const linesCst = parser.lines();

  return {
    parser,
    interpreter,
    result: interpreter.lines(linesCst.children)
  };
}
