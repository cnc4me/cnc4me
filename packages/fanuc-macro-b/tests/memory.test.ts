import { MacroMemory } from "../src";

describe("macro Memory", () => {
  const mem = new MacroMemory();

  it("can set a tool length", () => {
    mem.setToolLength(512, 2.3846);

    expect(mem.read(12512)).toBe(2.3846);
  });

  it("can set tool length compensation", () => {
    mem.setToolLengthComp(61, 0.01);

    expect(mem.read(11061)).toBe(0.01);
  });

  it("can set a tool diameter", () => {
    mem.setToolDiameter(5, 0.75);

    expect(mem.read(13005)).toBe(0.75);
  });

  it("can set tool diameter compensation", () => {
    mem.setToolDiameterComp(1, 0.002);

    expect(mem.read(14001)).toBe(0.002);
  });
});
