import { has } from "lodash";

import { ParsedLineData } from "../../types";
import { G10ParseResult, PossibleG10LineValues } from "../../types/g10";
import { createToolchain } from "../../utils";

export class G10Line {
  /**
   * Parsing a string of text as a G10 line for values
   *
   * @TODO this is DIRTY
   */
  static parse(input: string): G10ParseResult {
    const { errors, parser, interpreter } = createToolchain({ preloadInput: input });

    if (errors.length > 0) {
      return { error: errors[0].message, result: null };
    }

    const linesCst = parser.lines();
    const parsedLines = interpreter.lines(linesCst.children);
    const result = G10Line.fromLineData(parsedLines[0]);

    return {
      result,
      error: null
    };
  }

  /**
   *
   */
  static fromLineData(line: ParsedLineData): PossibleG10LineValues {
    const { addresses, gCodeMap } = line;

    if (has(gCodeMap, "G10") === false) {
      throw Error(`G10 not found.`);
    }

    return addresses.reduce((values, currAddr) => {
      return { ...values, [currAddr.prefix]: currAddr.value };
    }, {} as PossibleG10LineValues);
  }
}
