import { describe, expect, it } from "vitest";

import { FanucMacroB } from "../../src";

const TEST_CASES: Array<[expr: string, output: number]> = [
  ["ABS[5]", 5],
  ["ABS[-5]", 5]
];

describe("Interpreting BuiltinFunctions", () => {
  const fmb = new FanucMacroB();

  describe.each(TEST_CASES)("%s should evaluate to %s", (expr, output) => {
    const { error, result } = fmb.eval(expr);

    it("parses with no errors", () => {
      expect(error).toBeFalsy();
    });

    it("correctly evaluates the function", () => {
      expect(result).toBe(output);
    });
  });
});
