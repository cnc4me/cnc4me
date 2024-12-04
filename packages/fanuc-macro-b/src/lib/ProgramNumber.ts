export class ProgramNumber {
  constructor(
    private matchers: {
      onFail: (message: string) => void;
      onMatch: (prgNum: number) => void;
    }
  ) {
    // Setup the matcher with handlers
  }

  /**
   * Attempt to match a valid NC program identifier
   */
  match(input: string) {
    const cleanedInput = input.replace(/^%|[\n\r]/, "").trim();
    const result = cleanedInput.match(/^O([0-9]+)\s+/);

    if (result === null) {
      this.matchers.onFail("Program Number Not Found");
    } else {
      this.matchers.onMatch(Number(result[1]));
    }
  }
}
