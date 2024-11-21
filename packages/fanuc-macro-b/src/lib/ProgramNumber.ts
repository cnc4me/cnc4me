export class ProgramNumber {
  /**
   * Attempt to match a valid NC program identifier
   */
  static match(input: string, { MATCH, NOMATCH }: MatcherHandlers) {
    const result = input.match(/^O([0-9]+)\s+?(?:\(.+?\))?$/m);

    if (result === null) {
      return NOMATCH("Program Number Not Found");
    } else {
      return MATCH(result);
    }
  }
}

type MatcherHandlers = {
  MATCH: (match: RegExpMatchArray) => unknown;
  NOMATCH: (error: string) => unknown;
};
