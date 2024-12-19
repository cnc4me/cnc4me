import { hasG10 } from "./flags";

import type { IParsedLineData, PossibleG10LineValues } from "../types";

/**
 * Check for `G10` and extract axis values from {@link ParsedLineData}
 */
export function extractOffsets(line: IParsedLineData): PossibleG10LineValues {
  const { addresses, gCodeMap } = line;

  // @TODO: is this working?
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
