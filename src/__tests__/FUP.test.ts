import { interpret } from "../utils";

const code = `
#1=FUP[5.251]
#2=FUP[-2.136]
#3=FUP[0.001]
#4=FUP[9.004]`;

describe("Interpreting FUP[] function calls", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("can run with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate FUP[5.251]", () => {
    expect(result.get(1)).toBe(6);
  });

  it("can calculate FUP[-2.136]", () => {
    expect(result.get(2)).toBe(-2);
  });

  it("can calculate FUP[0.001]", () => {
    expect(result.get(3)).toBe(1);
  });

  it("can calculate FUP[9.004]", () => {
    expect(result.get(4)).toBe(10);
  });
});
