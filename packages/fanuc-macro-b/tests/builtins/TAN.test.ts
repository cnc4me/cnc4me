import { interpret } from "../../src";

const code = `
#1=TAN[5]
#2=TAN[15]
#3=TAN[30]
#4=TAN[45]
#5=TAN[60]
#6=TAN[135]`;

describe("function: TAN[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate TAN[5]", () => {
    expect(result.get(1)).toBeWithinTolerance(0.08749, 1e-5);
  });

  it("can calculate TAN[15]", () => {
    expect(result.get(2)).toBeWithinTolerance(0.26795, 1e-5);
  });

  it("can calculate TAN[30]", () => {
    expect(result.get(3)).toBeWithinTolerance(0.57735, 1e-5);
  });

  it("can calculate TAN[45]", () => {
    expect(result.get(4)).toBeWithinTolerance(1, 1e-14);
  });

  it("can calculate TAN[60]", () => {
    expect(result.get(5)).toBeWithinTolerance(1.73205, 1e-5);
  });

  it("can calculate TAN[135]", () => {
    expect(result.get(6)).toBeWithinTolerance(-1, 1e-14);
  });
});
