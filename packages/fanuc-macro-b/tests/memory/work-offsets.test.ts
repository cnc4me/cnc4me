import { MacroMemory } from "../../src";

describe("testing the MacroMemory's *WorkOffset* methods", () => {
  const mem = new MacroMemory();

  it("can set tool offset values and read by tool number.", () => {
    const toolNumber = 123;

    mem.setToolLength(toolNumber, 6.2341);
    mem.setToolDiameter(toolNumber, 0.4995);
    mem.setToolLengthComp(toolNumber, -0.0003);
    mem.setToolDiameterComp(toolNumber, -0.0012);

    expect(mem.read(11123)).toBe(6.2341);
    expect(mem.read(13123)).toBe(0.4995);
    expect(mem.read(10123)).toBe(-0.0003);
    expect(mem.read(12123)).toBe(-0.0012);
  });

  it("can set tool length by number and read by address.", () => {
    mem.setToolLength(1, 6.2341);
    mem.setToolLength(10, 3.4266);
    mem.setToolLength(52, 1.1121);
    mem.setToolLength(100, 3.3301);
    mem.setToolLength(212, 3.2019);
    mem.setToolLength(299, 5.2312);

    expect(mem.read(11001)).toBe(6.2341);
    expect(mem.read(11010)).toBe(3.4266);
    expect(mem.read(11052)).toBe(1.1121);
    expect(mem.read(11100)).toBe(3.3301);
    expect(mem.read(11212)).toBe(3.2019);
    expect(mem.read(11299)).toBe(5.2312);
  });

  it("can set tool length compensation and read by address", () => {
    mem.setToolLengthComp(2, 0.001);
    mem.setToolLengthComp(14, 0.012);
    mem.setToolLengthComp(33, -0.006);
    mem.setToolLengthComp(104, -0.0003);
    mem.setToolLengthComp(222, 0.022);

    expect(mem.read(10002)).toBe(0.001);
    expect(mem.read(10014)).toBe(0.012);
    expect(mem.read(10033)).toBe(-0.006);
    expect(mem.read(10104)).toBe(-0.0003);
    expect(mem.read(10222)).toBe(0.022);
  });

  it("can set a tool diameter", () => {
    mem.setToolDiameter(4, 0.75);
    mem.setToolDiameter(55, 0.3125);
    mem.setToolDiameter(99, -0.1);
    mem.setToolDiameter(125, 0.0625);
    mem.setToolDiameter(213, 3);

    expect(mem.read(13004)).toBe(0.75);
    expect(mem.read(13055)).toBe(0.3125);
    expect(mem.read(13099)).toBe(-0.1);
    expect(mem.read(13125)).toBe(0.0625);
    expect(mem.read(13213)).toBe(3);
  });

  it("can set tool diameter compensation", () => {
    mem.setToolDiameterComp(9, 0.011);
    mem.setToolDiameterComp(29, -0.0102);
    mem.setToolDiameterComp(50, -0.0006);
    mem.setToolDiameterComp(199, 0.003);
    mem.setToolDiameterComp(259, 0.0001);

    expect(mem.read(12009)).toBe(0.011);
    expect(mem.read(12029)).toBe(-0.0102);
    expect(mem.read(12050)).toBe(-0.0006);
    expect(mem.read(12199)).toBe(0.003);
    expect(mem.read(12259)).toBe(0.0001);
  });
});
