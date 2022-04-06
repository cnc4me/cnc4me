import { lines } from "../../src";

const code = `
#1=SIN[5]
#2=SIN[15]
#3=SIN[30]
#4=SIN[45]
#5=SIN[60]
#6=SIN[90]`;

describe("function: SIN[]", () => {
  const { parser, interpreter } = lines(code);
  const { Memory } = interpreter;

  it("parses with no errors", () => {
    expect(parser.errors).toHaveLength(0);
  });

  it("can calculate SIN[5]", () => {
    expect(Memory.read(1)).toBeWithinTolerance(0.08716, 1e-5);
  });

  it("can calculate SIN[15]", () => {
    expect(Memory.read(2)).toBeWithinTolerance(0.25882, 1e-5);
  });

  it("can calculate SIN[30]", () => {
    expect(Memory.read(3)).toBeWithinTolerance(0.5, 1e-14);
  });

  it("can calculate SIN[45]", () => {
    expect(Memory.read(4)).toBeWithinTolerance(0.70711, 1e-5);
  });

  it("can calculate SIN[60]", () => {
    expect(Memory.read(5)).toBeWithinTolerance(0.866028, 1e-5);
  });

  it("can calculate SIN[90]", () => {
    expect(Memory.read(6)).toBe(1);
  });
});
