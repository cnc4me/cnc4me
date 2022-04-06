import { G10ParseResult, ParsedLineData, PossibleG10LineValues } from "../../types";
import { createToolchain, hasG10 } from "../../utils";

/**
 * Check for `G10` and extract axis values from {@link ParsedLineData}
 */
export function extractOffsets(line: ParsedLineData): PossibleG10LineValues {
  const { addresses, gCodeMap } = line;

  if (!hasG10(gCodeMap)) {
    throw Error(`G10 not found.`);
  }

  return addresses.reduce((values, currAddr) => {
    return { ...values, [currAddr.prefix]: currAddr.value };
  }, {} as PossibleG10LineValues);
}

/**
 * Parsing a string of text as a G10 line for values
 */
export function parseG10(input: string): G10ParseResult {
  const { errors, parser, interpreter } = createToolchain({ preloadInput: input });

  if (errors.length > 0) {
    return { error: errors[0].message, result: null };
  }

  const linesCst = parser.lines();
  const parsedLines = interpreter.lines(linesCst.children);

  return {
    error: null,
    result: extractOffsets(parsedLines[0])
  };
}
