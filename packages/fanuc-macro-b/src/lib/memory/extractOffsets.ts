import { ParsedLineData, PossibleG10LineValues } from "../../types";
import { hasG10 } from "../../utils";

/**
 * Check for `G10` and extract axis values from {@link ParsedLineData}
 */
export function extractOffsets(line: ParsedLineData): PossibleG10LineValues {
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
