import { MacroMemory } from "../../src";

/**
 * G10 Line Reference
 *
 * @example ```
 * |--------|------------|-------|------------|
 * | Length | Len. Comp. | Diam. | Diam Comp. |
 * |--------|------------|-------|------------|
 * |  L11   |   L10      |  L13  |  L12       |
 * |--------|------------|-------|------------|
 *
 * L10 = Tool Length Compensation
 * L11 = Tool Length Geometry
 * L12 = Tool Diameter Compensation
 * L13 = Tool Diameter Geometry
 * ```
 */
const mem = new MacroMemory();

describe("testing the MacroMemory#g10()", () => {
  it("can set `T1` via G10 lines", () => {
    mem.g10({ L: 10, P: 1, R: 0.002 });
    mem.g10({ L: 11, P: 1, R: 5.1234 });
    mem.g10({ L: 12, P: 1, R: -0.0005 });
    mem.g10({ L: 13, P: 1, R: 0.375 });

    expect(mem.read(10001)).toBe(0.002);
    expect(mem.read(11001)).toBe(5.1234);
    expect(mem.read(12001)).toBe(-0.0005);
    expect(mem.read(13001)).toBe(0.375);
  });

  it("can set `T55` via G10 lines", () => {
    mem.g10({ L: 10, P: 55, R: 0.001 });
    mem.g10({ L: 11, P: 55, R: 1.2512 });
    mem.g10({ L: 12, P: 55, R: 0.003 });
    mem.g10({ L: 13, P: 55, R: 0.5 });

    expect(mem.read(10055)).toBe(0.001);
    expect(mem.read(11055)).toBe(1.2512);
    expect(mem.read(12055)).toBe(0.003);
    expect(mem.read(13055)).toBe(0.5);
  });

  it.skip("can set `G54` work offsets via g10 line.", () => {
    mem.g10({ L: 2, P: 1, X: 1, Y: 2, Z: 3, B: 4 });

    expect(mem.read(5221)).toBe(1);
    expect(mem.read(5222)).toBe(2);
    expect(mem.read(5223)).toBe(3);
    expect(mem.read(5224)).toBe(4);
  });
});
