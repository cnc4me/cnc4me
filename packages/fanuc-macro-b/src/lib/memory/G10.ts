import {
  G10ParseResult,
  ParsedLineData,
  PossibleG10LineValues
} from "../../types";
import { hasG10 } from "../../utils";
import { MacroRuntime } from "../MacroRuntime";

/**
 * Parsing a string of text as a G10 line for values
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

/**
 * Check for `G10` and extract axis values from {@link ParsedLineData}
 */
function extractOffsets(line: ParsedLineData): PossibleG10LineValues {
  const { addresses, gCodeMap } = line;

  if (!hasG10(gCodeMap)) {
    throw Error(`G10 not found.`);
  }

  return addresses.reduce((values, currAddr) => {
    return {
      ...values,
      [currAddr.prefix]: currAddr.value
    };
  }, {} as PossibleG10LineValues);
}
