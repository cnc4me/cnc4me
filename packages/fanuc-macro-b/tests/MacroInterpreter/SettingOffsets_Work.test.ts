import { beforeEach, describe, expect, it } from "vitest";

import { FanucMacroB } from "../../src";

/**
 * G10 Line Reference
 *
 * ```
 * L2  = Common Work Offsets
 * L20 = Aux Work Offsets
 * ```
 */
const G54_LINE = "G10 L2 P1 X7.5 Y21.5189 Z3.0025 B270.";
const G55_LINE = "G10 L2 P2 X-1.2365 Y2.3584 Z9.3201 B63.5";
const G54_1_P7 = "G10 L20 P7 X5.0023 Y12.3225 Z5.5201 B90.";

describe("use FanucMacroB#evalG10() to extract Work Offsets", () => {
  const fmb = new FanucMacroB();

  beforeEach(() => fmb.reset());

  it(`parses values for G54 via ${G54_LINE}`, () => {
    const { error, result } = fmb.evalG10(G54_LINE);

    expect(error).toBeFalsy();
    expect(result).toMatchObject({
      L: 2,
      P: 1,
      X: 7.5,
      Y: 21.5189,
      Z: 3.0025,
      B: 270
    });
  });

  it(`parses values for G55 via ${G55_LINE}`, () => {
    const { error, result } = fmb.evalG10(G55_LINE);

    expect(error).toBeFalsy();
    expect(result).toMatchObject({
      L: 2,
      P: 2,
      X: -1.2365,
      Y: 2.3584,
      Z: 9.3201,
      B: 63.5
    });
  });

  it(`parses values for G54.1 P7 via ${G54_1_P7}`, () => {
    const { error, result } = fmb.evalG10(G54_1_P7);

    expect(error).toBeFalsy();
    expect(result).toMatchObject({
      L: 20,
      P: 7,
      X: 5.0023,
      Y: 12.3225,
      Z: 5.5201,
      B: 90.0
    });
  });
});
