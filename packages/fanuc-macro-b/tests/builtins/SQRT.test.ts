import { interpret } from "../src";

const code = `
#1=SQRT[2]
#2=SQRT[36]
#3=SQRT[49]
#4=SQRT[144]
#5=SQRT[3173]`;

describe("function: SQRT[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate SQRT[2]", () => {
    expect(result.get(1)).toBeWithinTolerance(1.41421, 1e-5);
  });

  it("can calculate SQRT[36]", () => {
    expect(result.get(2)).toBe(6);
  });

  it("can calculate SQRT[49]", () => {
    expect(result.get(3)).toBe(7);
  });

  it("can calculate SQRT[144]", () => {
    expect(result.get(4)).toBe(12);
  });

  it("can calculate SQRT[3173]", () => {
    expect(result.get(5)).toBeWithinTolerance(56.32939, 1e-5);
  });
});
