import { describe, expect, it } from "vitest";

import { FanucMacroB } from "../../src";

const REGISTER = 1;
const MATCH_PRECISION = 6;

const TEST_CASES: [expr: string, answer: number][] = [
  [`#${REGISTER}=[1+2]`, 3],
  [`#${REGISTER}=[1+2+3]`, 6],
  [`#${REGISTER}=[1+2+3+4]`, 10],
  [`#${REGISTER}=[1+2+3+4+5]`, 15],
  [`#${REGISTER}=[1 + 2 + 3 + 4 + 5]`, 15],
  [`#${REGISTER}=[2      +      2]`, 4],
  [`#${REGISTER}=[    5+   5  ]`, 10],
  [`#${REGISTER}=[321 + 0.123]`, 321.123],
  [`#${REGISTER}=[.1 + .2]`, 0.3]
];

describe.skip("Evaluating addition with the MacroInterpreter", () => {
  const fmb = new FanucMacroB();

  it.each(TEST_CASES)(`parsing '%s' should equal '%s'`, (expr, answer) => {
    fmb.eval(expr);
    // expect(fmb.hasErrors).toBeFalsy();
    expect(fmb.memory.read(1)).toBeCloseTo(answer, MATCH_PRECISION);
  });
});
