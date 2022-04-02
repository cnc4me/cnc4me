import { getRandomAxisLocations } from "../../../testing";
import { MacroMemory } from "../MacroMemory";

const mem = new MacroMemory();

describe("setting `L2` work offsets with MacroMemory#g10()", () => {
  it("can set `G54.1` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 20, P: 1, X, Y, Z, B });

    // expect(mem.G54_1(1).X).toBe(X);
    // expect(mem.G54_1(1).Y).toBe(Y);
    // expect(mem.G54_1(1).Z).toBe(Z);
    // expect(mem.G54_1(1).B).toBe(B);

    expect(mem.read(7001)).toBe(X);
    expect(mem.read(7002)).toBe(Y);
    expect(mem.read(7003)).toBe(Z);
    expect(mem.read(7004)).toBe(B);
  });
});
