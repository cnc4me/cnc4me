import { MarcoToolchain } from "../lib";

import type { InterpretedLines, WithTools } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type WhatIsThis = WithTools<InterpretedLines, "parser" | "interpreter">;

/**
 * Run lines of text as gcode throught the {@link MacroIntepreter}
 * @TODO see if this can be something else, it is confusing
 */
export function lines(preloadInput: string) {
  const { runtime } = MarcoToolchain.create({ preloadInput });

  const linesCst = runtime.Parser.lines();

  return {
    runtime,
    result: runtime.Interpreter.lines(linesCst.children)
  };
}
