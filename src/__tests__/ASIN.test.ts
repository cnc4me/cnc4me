import { interpret } from "../utils";

const code = `
#1=ASIN[1]
#2=ASIN[${Math.sqrt(2) / 2}]
#3=ASIN[${Math.sqrt(3) / 2}]`;

describe("Function: ASIN[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate ASIN[1]", () => {
    expect(result.get(1)).toBe(90);
  });

  it("can calculate ASIN[x] (√2 / 2)", () => {
    expect(result.get(2)).toBe(45.00026);
  });

  it("can calculate ASIN[x] (√3 / 2)", () => {
    expect(result.get(3)).toBe(60.00053);
  });
});
