import { OFFSET_GROUPS } from "../../src/lib/MacroMemory/constants";
import { parseG10 } from "../../src/lib/MacroMemory/g10-tools";

/**
 * G10 Line Reference
 *
 * ```
 * L2  = Common Work Offsets
 * L10 = Tool Length Compensation
 * L11 = Tool Length Geometry
 * L12 = Tool Diameter Compensation
 * L13 = Tool Diameter Geometry
 * L20 = Aux Work Offsets
 * ```
 */
const G10_LINES = {
  G54: "G10 L2 P1 X7.5 Y21.5189 Z3.0025 B270.",
  G55: "G10 L2 P2 X-1.2365 Y2.3584 Z9.3201 B63.5",
  G54_1_P7: "G10 L20 P7 X5.0023 Y12.3225 Z5.5201 B90.",
  T5_LENGTH: "G10 L11 P5 R6.5132",
  T156_LENGTH_COMP: "G10 L10 P156 R.002",
  T33_DIAMETER: "G10 L13 P33 R.375",
  T298_DIAMETER_COMP: "G10 L12 P298 R-.0012"
};

describe("testing the parseG10() method for extracting adresses and values", () => {
  describe("extracting X, Y, Z, and B values", () => {
    it(`can get values for G54 via ${G10_LINES.G54}`, () => {
      const result = parseG10(G10_LINES.G54);

      expect(result).toMatchObject({
        error: null,
        result: {
          L: 2,
          P: 1,
          X: 7.5,
          Y: 21.5189,
          Z: 3.0025,
          B: 270
        }
      });
    });

    it(`can get values for G55 via ${G10_LINES.G55}`, () => {
      const result = parseG10(G10_LINES.G55);

      expect(result).toMatchObject({
        error: null,
        result: {
          L: 2,
          P: 2,
          X: -1.2365,
          Y: 2.3584,
          Z: 9.3201,
          B: 63.5
        }
      });
    });

    it(`can get values for G54.1 P7 via ${G10_LINES.G54_1_P7}`, () => {
      const result = parseG10(G10_LINES.G54_1_P7);

      expect(result).toMatchObject({
        error: null,
        result: {
          L: 20,
          P: 7,
          X: 5.0023,
          Y: 12.3225,
          Z: 5.5201,
          B: 90.0
        }
      });
    });
  });

  describe("extracting P and R values", () => {
    it(`can get values for T5 (height) via ${G10_LINES.T5_LENGTH}`, () => {
      const result = parseG10(G10_LINES.T5_LENGTH);

      expect(result).toMatchObject({
        error: null,
        result: {
          L: OFFSET_GROUPS.TOOL.LENGTH,
          P: 5,
          R: 6.5132
        }
      });
    });

    it(`can get values for T156 (height comp.) via ${G10_LINES.T156_LENGTH_COMP}`, () => {
      const result = parseG10(G10_LINES.T156_LENGTH_COMP);

      expect(result).toMatchObject({
        error: null,
        result: {
          L: OFFSET_GROUPS.TOOL.LENGTH_COMP,
          P: 156,
          R: 0.002
        }
      });
    });

    it(`can get values for T33 (diameter) via ${G10_LINES.T33_DIAMETER}`, () => {
      const result = parseG10(G10_LINES.T33_DIAMETER);

      expect(result).toMatchObject({
        error: null,
        result: {
          L: OFFSET_GROUPS.TOOL.DIAMETER,
          P: 33,
          R: 0.375
        }
      });
    });

    it(`can get values for T298 (diameter comp.) via ${G10_LINES.T298_DIAMETER_COMP}`, () => {
      const result = parseG10(G10_LINES.T298_DIAMETER_COMP);

      expect(result).toMatchObject({
        error: null,
        result: {
          L: OFFSET_GROUPS.TOOL.DIAMETER_COMP,
          P: 298,
          R: -0.0012
        }
      });
    });
  });
});
