interface MatcherHandlers {
    MATCH: (match: RegExpMatchArray) => unknown;
    NOMATCH: (error: string) => unknown;
}
/**
 * Attempt to match a valid NC program identifier
 */
export declare function matchProgramNumber(input: string, { MATCH, NOMATCH }: MatcherHandlers): unknown;
export {};
