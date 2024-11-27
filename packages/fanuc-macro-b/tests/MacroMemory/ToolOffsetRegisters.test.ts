import { describe, expect, it } from "vitest";

import { MacroMemory } from "../../src";
import { rand } from "../_vitest/helpers";

import type { ValidG10OffsetGroups } from "@cnc4me/fanuc-macro-b/src";

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
const TEST_CASES: TestData[] = [
  { register: 10001, L: 10, P: 1, R: rand(0, 12) },
  { register: 10026, L: 10, P: 26, R: rand(0, 12) },
  { register: 10077, L: 10, P: 77, R: rand(0, 12) },
  { register: 10105, L: 10, P: 105, R: rand(0, 12) },
  { register: 10299, L: 10, P: 299, R: rand(0, 12) },
  { register: 11005, L: 11, P: 5, R: rand(-1, 1) },
  { register: 11026, L: 11, P: 26, R: rand(-1, 1) },
  { register: 11077, L: 11, P: 77, R: rand(-1, 1) },
  { register: 11111, L: 11, P: 111, R: rand(-1, 1) },
  { register: 11299, L: 11, P: 299, R: rand(-1, 1) },
  { register: 12009, L: 12, P: 9, R: rand(0, 12) },
  { register: 12011, L: 12, P: 11, R: rand(0, 12) },
  { register: 12030, L: 12, P: 30, R: rand(0, 12) },
  { register: 12101, L: 12, P: 101, R: rand(0, 12) },
  { register: 12222, L: 12, P: 222, R: rand(0, 12) },
  { register: 13019, L: 13, P: 19, R: rand(-1, 1) },
  { register: 13032, L: 13, P: 32, R: rand(-1, 1) },
  { register: 13066, L: 13, P: 66, R: rand(-1, 1) },
  { register: 13190, L: 13, P: 190, R: rand(-1, 1) },
  { register: 13248, L: 13, P: 248, R: rand(-1, 1) }
];

describe("setting Tool Offset Registers with MacroMemory#g10()", () => {
  const mem = new MacroMemory();

  it.each(TEST_CASES)(
    "call to `G10 L$L P$P R$R` sets register #$register to $R",
    ({ register, L, P, R }) => {
      mem.g10({ L, P, R });

      expect(mem.read(register)).toBe(R);
    }
  );
});

type TestData = {
  register: number;
  L: ValidG10OffsetGroups;
  P: number;
  R: number;
};
