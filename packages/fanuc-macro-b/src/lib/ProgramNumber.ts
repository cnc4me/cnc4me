export class ProgramNumber {
  static create(matchers: Partial<Matchers>) {
    return new ProgramNumber({
      ...{
        onFail: x => x,
        onMatch: x => x
      },
      ...matchers
    });
  }

  static isValid(input: string) {
    const cleanedInput = input.replace(/^%|[\n\r]/, "").trim();
    const result = cleanedInput.match(/^O([0-9]+)/);
    return result !== null;
  }

  constructor(private matchers: Matchers) {
    // Setup the matcher with handlers
  }

  /**
   * Attempt to match a valid NC program identifier
   */
  match(input: string) {
    const cleanedInput = input.replace(/^%|[\n\r]/, "").trim();
    const result = cleanedInput.match(/^O([0-9]+)/);

    if (result === null) {
      this.matchers.onFail(new Error("Program Number Not Found"));
    } else {
      this.matchers.onMatch(Number(result[1]));
    }
  }
}

type Matchers = {
  onFail: (message: Error) => void;
  onMatch: (prgNum: number) => void;
};
