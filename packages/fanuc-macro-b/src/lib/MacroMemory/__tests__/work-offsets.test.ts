import { MacroMemory } from "../MacroMemory";

describe("testing the MacroMemory's *WorkOffset* methods", () => {
  const mem = new MacroMemory();

  it("can set `G54` and read it's offsets.", () => {
    const offsets = {
      X: 6.2341,
      Y: 4.4416,
      Z: -12.1509,
      B: 90
    };

    mem.setWorkOffset(54, offsets);

    expect(mem.read(5221)).toBe(6.2341);
    expect(mem.read(5222)).toBe(4.4416);
    expect(mem.read(5223)).toBe(-12.1509);
    expect(mem.read(5224)).toBe(90);
    expect(mem.G54).toMatchObject(offsets);
  });

  it("can set `G55` and read it's offsets.", () => {
    const offsets = {
      X: 9.2575,
      Y: 14.1283,
      Z: -20.1734,
      B: 0
    };

    mem.setWorkOffset(55, offsets);

    expect(mem.read(5241)).toBe(9.2575);
    expect(mem.read(5242)).toBe(14.1283);
    expect(mem.read(5243)).toBe(-20.1734);
    expect(mem.read(5244)).toBe(0);
    expect(mem.G55).toMatchObject(offsets);
  });
});
