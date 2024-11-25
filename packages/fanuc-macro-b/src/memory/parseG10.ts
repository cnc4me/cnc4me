import { MacroRuntime } from "../FanucMacroB/MacroRuntime";
import { extractOffsets } from "./extractOffsets";

import type { G10ParseResult } from "../types";

/**
 * Parsing a string of text as a G10 line for values
 * @TODO make this lighter? move to somewhere else?
 */
export function parseG10(preloadInput: string): G10ParseResult {
  const runtime = new MacroRuntime();
  const parsedLines = runtime.evalLines(preloadInput);

  return {
    runtime,
    error: runtime.getErrors(),
    result: extractOffsets(parsedLines[0])
  };
}
