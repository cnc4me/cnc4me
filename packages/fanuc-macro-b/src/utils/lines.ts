import { createToolchain } from "./createToolchain";

import type { InterpretedLines, WithTools } from "../types";

/**
 * Run lines of text as gcode throught the {@link MacroIntepreter}
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
