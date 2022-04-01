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

  it("can set `T37` via G10 lines", () => {
    mem.g10({ L: 10, P: 37, R: 0.001 });
    mem.g10({ L: 11, P: 37, R: 1.2512 });
    mem.g10({ L: 12, P: 37, R: 0.003 });
    mem.g10({ L: 13, P: 37, R: 0.5 });

    expect(mem.read(10037)).toBe(0.001);
    expect(mem.read(11037)).toBe(1.2512);
    expect(mem.read(12037)).toBe(0.003);
    expect(mem.read(13037)).toBe(0.5);
  });

  it("can set `G54` work offsets via g10 line.", () => {
    mem.g10({ L: 2, P: 1, X: 1, Y: 2, Z: 3, B: 4 });

    expect(mem.G54.X).toBe(1);
    expect(mem.G54.Y).toBe(2);
    expect(mem.G54.Z).toBe(3);
    expect(mem.G54.B).toBe(4);
    expect(mem.read(5221)).toBe(1);
    expect(mem.read(5222)).toBe(2);
    expect(mem.read(5223)).toBe(3);
    expect(mem.read(5224)).toBe(4);
  });

  it("can set `G55` work offsets via g10 line.", () => {
    mem.g10({ L: 2, P: 2, X: 0.1, Y: 0.2, Z: 0.3, B: 0.4 });

    expect(mem.G55.X).toBe(0.1);
    expect(mem.G55.Y).toBe(0.2);
    expect(mem.G55.Z).toBe(0.3);
    expect(mem.G55.B).toBe(0.4);
    expect(mem.read(5241)).toBe(0.1);
    expect(mem.read(5242)).toBe(0.2);
    expect(mem.read(5243)).toBe(0.3);
    expect(mem.read(5244)).toBe(0.4);
  });
});
