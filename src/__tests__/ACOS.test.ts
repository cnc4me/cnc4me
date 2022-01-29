import { interpret } from "../utils";

const code = `
#1=ACOS[1]
#2=ACOS[-1]
#3=ACOS[${Math.sqrt(2) / 2}]
#4=ACOS[${Math.sqrt(3) / 2}]
#5=ACOS[.5]`;

describe("Function: ACOS[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate ACOS[1]", () => {
    expect(result.get(1)).toBe(0);
  });

  it("can calculate ACOS[-1]", () => {
    expect(result.get(2)).toBe(180);
  });

  it("can calculate ACOS[x] (√2 / 2)", () => {
    expect(result.get(3)).toBe(44.99974);
  });

  it("can calculate ACOS[x] (√3 / 2)", () => {
    expect(result.get(4)).toBe(29.99947);
  });

  it("can calculate ACOS[.5]", () => {
    expect(result.get(5)).toBe(60);
  });
});
