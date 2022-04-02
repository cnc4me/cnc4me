import { MacroMemory } from "../../src";
import { bigRand } from "../../src/utils";

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
const mem = new MacroMemory();
describe("setting `L2` work offsets with MacroMemory#g10()", () => {
  it.skip("can set `G54.1` work offsets via G10 line.", () => {
    mem.g10({ L: 20, P: 1, X: 1, Y: 2, Z: 3, B: 4 });

    expect(mem.G54.X).toBe(1);
    expect(mem.G54.Y).toBe(2);
    expect(mem.G54.Z).toBe(3);
    expect(mem.G54.B).toBe(5.5);

    expect(mem.read(5221)).toBe(1);
    expect(mem.read(5222)).toBe(2);
    expect(mem.read(5223)).toBe(3);
    expect(mem.read(5224)).toBe(4);
  });
});
