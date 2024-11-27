import { describe, expect, it } from "vitest";

import { FanucMacroB, OFFSET_GROUPS } from "../../src";

/**
 * G10 Line Reference
 *
 * ```
 * L10 = Tool Length Compensation
 * L11 = Tool Length Geometry
 * L12 = Tool Diameter Compensation
 * L13 = Tool Diameter Geometry
 * ```
 */
const G10_LINES = {
  T5_LENGTH: "G10 L11 P5 R6.5132",
  T156_LENGTH_COMP: "G10 L10 P156 R.002",
  T33_DIAMETER: "G10 L13 P33 R.375",
  T298_DIAMETER_COMP: "G10 L12 P298 R-.0012"
};

const fmb = new FanucMacroB();

describe("testing the FanucMacroB#evalG10() method for extracting Tool Offsets", () => {
  it(`can get values for T5 (height) via ${G10_LINES.T5_LENGTH}`, () => {
    const { error, result } = fmb.evalG10(G10_LINES.T5_LENGTH);

    expect(error).toBeFalsy();
    expect(result).toMatchObject({
      L: OFFSET_GROUPS.TOOL.LENGTH,
      P: 5,
      R: 6.5132
    });
  });

  it(`can get values for T156 (height comp.) via ${G10_LINES.T156_LENGTH_COMP}`, () => {
    const { error, result } = fmb.evalG10(G10_LINES.T156_LENGTH_COMP);

    expect(error).toBeFalsy();
    expect(result).toMatchObject({
      L: OFFSET_GROUPS.TOOL.LENGTH_COMP,
      P: 156,
      R: 0.002
    });
  });

  it(`can get values for T33 (diameter) via ${G10_LINES.T33_DIAMETER}`, () => {
    const { error, result } = fmb.evalG10(G10_LINES.T33_DIAMETER);

    expect(error).toBeFalsy();
    expect(result).toMatchObject({
      L: OFFSET_GROUPS.TOOL.DIAMETER,
      P: 33,
      R: 0.375
    });
  });

  it(`can get values for T298 (diameter comp.) via ${G10_LINES.T298_DIAMETER_COMP}`, () => {
    const { error, result } = fmb.evalG10(G10_LINES.T298_DIAMETER_COMP);

    expect(error).toBeFalsy();
    expect(result).toMatchObject({
      L: OFFSET_GROUPS.TOOL.DIAMETER_COMP,
      P: 298,
      R: -0.0012
    });
  });
});
