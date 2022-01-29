import { interpret } from "../utils";

const code = `
#1=SQRT[2]
#2=SQRT[36]
#3=SQRT[49]
#4=SQRT[144]
#5=SQRT[3173]`;

describe("Interpreting SQRT[] function calls", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("can run with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate SQRT[2]", () => {
    expect(result.get(1)).toBe(1.41421);
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
    expect(result.get(5)).toBe(56.32939);
  });
});
