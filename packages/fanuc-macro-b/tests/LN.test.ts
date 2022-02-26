import { interpret } from "../src";

const code = `
#1=LN[5]
#2=LN[10]
#3=LN[49]
#4=LN[144]`;

describe("function: LN[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate LN[5]", () => {
    expect(result.get(1)).toBeWithinTolerance(1.60944, 1e-5);
  });

  it("can calculate LN[36]", () => {
    expect(result.get(2)).toBeWithinTolerance(2.30259, 1e-5);
  });

  it("can calculate LN[49]", () => {
    expect(result.get(3)).toBeWithinTolerance(3.891825, 1e-5);
  });

  it("can calculate LN[144]", () => {
    expect(result.get(4)).toBeWithinTolerance(4.96981, 1e-5);
  });
});
