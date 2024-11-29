/**
 * @link https://www.cnczone.com/forums/fanuc/74237-bin-bcd-functions.html
 * @link https://www.cnczone.com/forums/fanuc/74237-bin-bcd-functions-post572760.html#post572760
 */

import { describe, expect, it } from "vitest";

import { FanucMacroB } from "../../../src";

const BIN_TEST_CASES: TestCases = [
  // To Binary
  [`BIN[1]`, 1],
  [`BIN[2]`, 10],
  [`BIN[3]`, 11],
  [`BIN[4]`, 100],
  [`BIN[5]`, 101],
  [`BIN[22]`, 10110],
  [`BIN[121]`, 1111001],
  [`BIN[999]`, 1111100111]
];

const BCD_TEST_CASES: TestCases = [
  // To Binary Coded Decimal
  [`BCD[1]`, 1],
  [`BCD[10]`, 2],
  [`BCD[11]`, 3],
  [`BCD[100]`, 4],
  [`BCD[101]`, 5],
  [`BCD[22]`, 10110],
  [`BCD[121]`, 1111001],
  [`BCD[999]`, 1111100111]
];

describe("Interpreting BuiltinFunctions", () => {
  const fmb = new FanucMacroB();

  describe("Binary", () => {
    it.each(BIN_TEST_CASES)("%s = %s", (expr, output) => {
      const { error, result } = fmb.evalFunctionExpr(expr);

      expect(error).toBeFalsy();
      expect(result).toBeCloseTo(output, 4);
    });
  });

  describe.skip("Binary Coded Decimal", () => {
    it.each(BCD_TEST_CASES)("%s = %s", (expr, output) => {
      const { error, result } = fmb.evalFunctionExpr(expr);

      expect(error).toBeFalsy();
      expect(result).toBeCloseTo(output, 4);
    });
  });
});

type TestCases = Array<[expr: string, output: number]>;
