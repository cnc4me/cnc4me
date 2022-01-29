import { interpret } from "../utils";

const code = `
#1=LN[5]
#2=LN[10]
#3=LN[49]
#4=LN[144]`;

describe("Function: LN[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate LN[5]", () => {
    expect(result.get(1)).toBe(1.60944);
  });

  it("can calculate LN[36]", () => {
    expect(result.get(2)).toBe(2.30259);
  });

  it("can calculate LN[49]", () => {
    expect(result.get(3)).toBe(3.89182);
  });

  it("can calculate LN[144]", () => {
    expect(result.get(4)).toBe(4.96981);
  });
});
