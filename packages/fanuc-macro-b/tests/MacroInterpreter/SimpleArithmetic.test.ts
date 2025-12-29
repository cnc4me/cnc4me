import { describe, expect, it } from "vitest";
import { FanucMacroB } from "../../src";

const MATCH_PRECISION = 6;

const TEST_CASES: Record<string, [expr: string, answer: number][]> = {
  Addition: [
    // Addition
    ["1+2", 3],
    ["1+2+3", 6],
    ["1+2+3+4", 10],
    ["1+2+3+4+5", 15],
    ["1 + 2 + 3 + 4 + 5", 15],
    ["2      +      2", 4],
    ["    5+   5  ", 10],
    ["321+0.123", 321.123],
    [".1+.2", 0.3],
  ],
  Subtraction: [
    [`2-1`, 1],
    [`3-2-1`, 0],
    [`4-3-2-1`, -2],
    [`100 - 50`, 50],
    [`54.321 - .321`, 54],
    [`0.2 - 0.1`, 0.1],
    [`10000000 - .1`, 9999999.9],
  ],
  Multiplication: [
    [`2*2`, 4],
    [`4*4`, 16],
    [`8*8`, 64],
    [`16 * 16`, 256],
    [`1*2*3*4*5`, 120],
    [`1234 * 0`, 0],
  ],
  Division: [
    [`2/2`, 1],
    [`4/2`, 2],
    [`32/4`, 8],
    [`666 / 333`, 2],
    [`10 / 0.5`, 20],
    [`0.1 / 0.2`, 0.5],
  ],
  Modulus: [
    [`10 MOD 10`, 0],
    [`10 MOD 4`, 2],

    // Modulus with negative numbers
    [`-10 MOD 10`, 0],
    [`-10 MOD 4`, -2],
    [`10 MOD -4`, 2],
    [`-10 MOD -4`, -2],

    // Modulus with non-zero remainders
    [`25 MOD 7`, 4], // 25 % 7 is 4
    [`100 MOD 9`, 1], // 100 % 9 is 1
    [`49 MOD 8`, 1], // 49 % 8 is 1
    [`999 MOD 100`, 99], // 999 % 100 is 99

    // Modulus with larger numbers
    [`987654321 MOD 124`, 25],

    // Edge cases: Modulo of zero
    [`0 MOD 5`, 0],
    [`0 MOD -5`, 0],

    // Large numbers with small modulus
    [`10000000 MOD 7`, 3],
  ],
};

const fmb = new FanucMacroB();

describe.each(
  Object.keys(TEST_CASES),
)("Interpreting %s Expressions", (testGroup) => {
  it.each(
    TEST_CASES[testGroup],
  )(`parsing '%s' should equal '%s'`, (expr, answer) => {
    const { error, result } = fmb.evalExpr(expr);

    expect(error).toBeFalsy();
    expect(result).toBeCloseTo(answer, MATCH_PRECISION);
  });
});
