import { MacroMemory } from "../../src";

/**
 * G10 Line Reference
 *
 * @example ```
 * |--------|------------|-------|------------|
 * | Length | Len. Comp. | Diam. | Diam Comp. |
 * |--------|------------|-------|------------| * |  L11   |   L10      |  L13  |  L12
 * |--------|------------|-------|-----------
 *
 * L10 = Tool Length Compensation
 * L11 = Tool Length Geometry
 * L12 = Tool Diameter Compensation
 * L13 = Tool Diameter Geometry
 * ```
 */
const mem = new MacroMemory();

describe("testing the MacroMemory#g10()", () => {
  describe("can set length offset registers", () => {
    it("sets `T1` without error", () => {
      mem.g10({ L: 10, P: 1, R: 0.002 });
      mem.g10({ L: 11, P: 1, R: 5.1234 });

      expect(mem.read(10001)).toBe(0.002);
      expect(mem.read(11001)).toBe(5.1234);
    });
  });

  it("can set all offset registers for `T22` via g10 line.", () => {
    mem.g10({ L: 11, P: 22, R: 8.6753 });

    expect(mem.read(11022)).toBe(8.6753);
  });

  it("can set `T22` length offset via g10 line.", () => {
    mem.g10({ L: 11, P: 22, R: 8.6753 });

    expect(mem.read(11022)).toBe(8.6753);
  });

  it.skip("can set `G54` work offsets via g10 line.", () => {
    mem.g10({ L: 2, P: 1, X: 1, Y: 2, Z: 3, B: 4 });

    expect(mem.read(5221)).toBe(1);
    expect(mem.read(5222)).toBe(2);
    expect(mem.read(5223)).toBe(3);
    expect(mem.read(5224)).toBe(4);
  });
});
