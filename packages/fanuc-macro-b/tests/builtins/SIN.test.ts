import { interpret } from "../src";

const code = `
#1=SIN[5]
#2=SIN[15]
#3=SIN[30]
#4=SIN[45]
#5=SIN[60]
#6=SIN[90]`;

describe("function: SIN[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate SIN[5]", () => {
    expect(result.get(1)).toBeWithinTolerance(0.08716, 1e-5);
  });

  it("can calculate SIN[15]", () => {
    expect(result.get(2)).toBeWithinTolerance(0.25882, 1e-5);
  });

  it("can calculate SIN[30]", () => {
    expect(result.get(3)).toBeWithinTolerance(0.5, 1e-14);
  });

  it("can calculate SIN[45]", () => {
    expect(result.get(4)).toBeWithinTolerance(0.70711, 1e-5);
  });

  it("can calculate SIN[60]", () => {
    expect(result.get(5)).toBeWithinTolerance(0.866028, 1e-5);
  });

  it("can calculate SIN[90]", () => {
    expect(result.get(6)).toBe(1);
  });
});
