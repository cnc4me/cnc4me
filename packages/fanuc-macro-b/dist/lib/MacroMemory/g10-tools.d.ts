import { G10ParseResult, ParsedLineData, PossibleG10LineValues } from "../../types";
/**
 * Check for `G10` and extract axis values from {@link ParsedLineData}
 */
export declare function extractOffsets(line: ParsedLineData): PossibleG10LineValues;
/**
 * Parsing a string of text as a G10 line for values
 */
export declare function parseG10(input: string): G10ParseResult;
