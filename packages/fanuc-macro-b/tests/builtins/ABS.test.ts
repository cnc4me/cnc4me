import { parseLines } from "../../src";

const code = `
#1=ABS[5]
#2=ABS[-5]`;

describe("function: ABS[]", () => {
  const { parseErrors, result } = parseLines(code);
  // const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate ABS[5]", () => {
    expect(result[0].get(1)).toBe(5);
  });

  it("can calculate ABS[-5]", () => {
    expect(result.get(2)).toBe(5);
  });
});
