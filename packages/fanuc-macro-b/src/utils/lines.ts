import { MacroRuntime } from "../lib/MacroRuntime";
import Toolchain from "../lib/Toolchain";

import type { InterpretedLines, WithTools } from "../types";

type WhatIsThis = WithTools<InterpretedLines, "parser" | "interpreter">;

/**
 * Run lines of text as gcode throught the {@link MacroIntepreter}
 */
export function lines(preloadInput: string) {
  const runtime = new MacroRuntime();

  Toolchain.create(runtime, { preloadInput });

  const linesCst = runtime.Parser.lines();

  return {
    runtime,
    result: runtime.Interpreter.lines(linesCst.children)
  };
}
