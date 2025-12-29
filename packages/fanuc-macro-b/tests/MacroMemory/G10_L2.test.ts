import { describe, expect, it } from "vitest";
import { MacroMemory, MemoryConstants } from "../../src";
import { getRandomAxisLocations } from "../_vitest/helpers";
import type { G10WorkOffsets } from "../../src";

const TEST_CASES = [
  { workOffset: "G53", P: 0, offsetCode: 53, baseAddress: 5200 },
  { workOffset: "G54", P: 1, offsetCode: 54, baseAddress: 5220 },
  { workOffset: "G55", P: 2, offsetCode: 55, baseAddress: 5240 },
  { workOffset: "G56", P: 3, offsetCode: 56, baseAddress: 5260 },
  { workOffset: "G57", P: 4, offsetCode: 57, baseAddress: 5280 },
  { workOffset: "G58", P: 5, offsetCode: 58, baseAddress: 5300 },
  { workOffset: "G59", P: 6, offsetCode: 59, baseAddress: 5320 },
];

describe("setting work offsets with MacroMemory#g10()", () => {
  const mem = new MacroMemory();

  describe.each(TEST_CASES)(`can set $workOffset work offsets via G10 line.`, ({
    P,
    offsetCode,
    baseAddress,
  }) => {
    const { X, Y, Z, B } = getRandomAxisLocations();
    const input = {
      L: MemoryConstants.OFFSET_GROUPS.WORK.COMMON,
      P,
      X,
      Y,
      Z,
      B,
    } as G10WorkOffsets;

    mem.g10(input);

    it("has the correct axis values", () => {
      const offsets = mem.getWorkCoordinateRecord(offsetCode);

      expect(offsets.X).toBe(X);
      expect(offsets.Y).toBe(Y);
      expect(offsets.Z).toBe(Z);
      expect(offsets.B).toBe(B);
    });

    it("has the correct values in the internal registers", () => {
      expect(mem.read(baseAddress + 1)).toBe(X);
      expect(mem.read(baseAddress + 2)).toBe(Y);
      expect(mem.read(baseAddress + 3)).toBe(Z);
      expect(mem.read(baseAddress + 4)).toBe(B);
    });
  });
});
