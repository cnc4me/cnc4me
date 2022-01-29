import { interpret } from "../utils";

const code = `
#1=ABS[5]
#2=ABS[-5]`;

describe("Function: ABS[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate ABS[5]", () => {
    expect(result.get(1)).toBe(5);
  });

  it("can calculate ABS[-5]", () => {
    expect(result.get(2)).toBe(5);
  });
});
