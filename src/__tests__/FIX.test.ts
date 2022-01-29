import { interpret } from "../utils";

const code = `
#1=FIX[5.251]
#2=FIX[-2.136]
#3=FIX[0.001]
#4=FIX[100]`;

describe("Function: FIX[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate FIX[5.251]", () => {
    expect(result.get(1)).toBe(5);
  });

  it("can calculate FIX[-2.736]", () => {
    expect(result.get(2)).toBe(-3);
  });

  it("can calculate FIX[0.001]", () => {
    expect(result.get(3)).toBe(0);
  });

  it("can calculate FIX[100]", () => {
    expect(result.get(4)).toBe(100);
  });
});
