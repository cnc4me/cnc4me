import { interpret } from "../utils";

const code = `
#1=ATAN[1]
#2=ATAN[${1 / Math.sqrt(3)}]
#3=ATAN[${Math.sqrt(3)}]`;

describe("Function: ATAN[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate ATAN[1]", () => {
    expect(result.get(1)).toBe(45);
  });

  it("can calculate ATAN[0.5773502691896258] (1/√3)", () => {
    expect(result.get(2)).toBe(29.99999);
  });

  it("can calculate ATAN[1.7320508075688772] (√3)", () => {
    expect(result.get(3)).toBe(59.99999);
  });
});
