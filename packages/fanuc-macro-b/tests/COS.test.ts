import { interpret } from "../src";

const code = `
#1=COS[5]
#2=COS[15]
#3=COS[30]
#4=COS[45]
#5=COS[60]
#6=COS[90]`;

describe("function: COS[]", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate COS[5]", () => {
    expect(result.get(1)).toBeWithinTolerance(0.99619, 1e-5);
  });

  it("can calculate COS[15]", () => {
    expect(result.get(2)).toBeWithinTolerance(0.96593, 1e-5);
  });

  it("can calculate COS[30]", () => {
    expect(result.get(3)).toBeWithinTolerance(0.86603, 1e-5);
  });

  it("can calculate COS[45]", () => {
    expect(result.get(4)).toBeWithinTolerance(0.70711, 1e-5);
  });

  it("can calculate COS[60]", () => {
    expect(result.get(5)).toBeWithinTolerance(0.5, 1e-14);
  });

  it("can calculate COS[90]", () => {
    expect(result.get(6)).toBeWithinTolerance(0, 1e-16);
  });
});
