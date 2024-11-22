import { describe, expect, it } from "vitest";

import { FanucMacroB } from "../../src";

const REGISTER = 1;
const MATCH_PRECISION = 6;

const TEST_CASES: [expr: string, answer: number][] = [
  [`#${REGISTER}=[2*2]`, 4],
  [`#${REGISTER}=[4*4]`, 16],
  [`#${REGISTER}=[8*8]`, 64],
  [`#${REGISTER}=[16*16]`, 256]
];

describe("Evaluating multiplication with the MacroInterpreter", () => {
  const fmb = new FanucMacroB();

  it.each(TEST_CASES)(`parsing '%s' should equal '%s'`, (expr, answer) => {
    fmb.eval(expr);
    // expect(fmb.hasErrors).toBeFalsy();
    expect(fmb.memory.read(1)).toMatchWithPrecision(answer, MATCH_PRECISION);
  });
});
