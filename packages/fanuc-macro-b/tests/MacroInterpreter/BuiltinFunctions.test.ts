import { describe, expect, it } from "vitest";

import { FanucMacroB } from "../../src";

const REGISTER = 1;
const TEST_CASES: Array<[expr: string, output: number]> = [
  [`#${REGISTER}=ABS[5]`, 5],
  [`#${REGISTER}=ABS[-5]`, 5]
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
