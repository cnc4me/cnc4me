import { describe, expect, it } from "vitest";

import { MacroMemory } from "../../src";
import { getRandomAxisLocations } from "../_vitest/helpers";

const TEST_CASES = [
  { P: 1, xReg: 7001, yReg: 7002, zReg: 7003, bReg: 7004 },
  { P: 2, xReg: 7021, yReg: 7022, zReg: 7023, bReg: 7024 },
  { P: 3, xReg: 7041, yReg: 7042, zReg: 7043, bReg: 7044 },
  { P: 4, xReg: 7061, yReg: 7062, zReg: 7063, bReg: 7064 },
  { P: 5, xReg: 7081, yReg: 7082, zReg: 7083, bReg: 7084 },
  { P: 25, xReg: 7481, yReg: 7482, zReg: 7483, bReg: 7484 },
  { P: 49, xReg: 7961, yReg: 7962, zReg: 7963, bReg: 7964 }
];

describe("setting Tool Offset Registers with MacroMemory#g10()", () => {
  const mem = new MacroMemory();

  it.each(TEST_CASES)(
    "interpret `G10 L20 P$P` to set #$xReg (X), #$yReg (Y), #$zReg (Z), #$bReg (B)",
    ({ P, xReg, yReg, zReg, bReg }) => {
      const { X, Y, Z, B } = getRandomAxisLocations();

      mem.g10({ L: 20, P, X, Y, Z, B });

      expect(mem.read(xReg)).toBe(X);
      expect(mem.read(yReg)).toBe(Y);
      expect(mem.read(zReg)).toBe(Z);
      expect(mem.read(bReg)).toBe(B);
    }
  );
});
