import { interpret } from "../utils";

const code = `
#1=COS[5]
#2=COS[15]
#3=COS[30]
#4=COS[45]
#5=COS[60]
#6=COS[90]`;

describe("Interpreting COS[] function calls", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("can run with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can calculate COS[5]", () => {
    expect(result.get(1)).toBe(0.99619);
  });

  it("can calculate COS[15]", () => {
    expect(result.get(2)).toBe(0.96593);
  });

  it("can calculate COS[30]", () => {
    expect(result.get(3)).toBe(0.86603);
  });

  it("can calculate COS[45]", () => {
    expect(result.get(4)).toBe(0.70711);
  });

  it("can calculate COS[60]", () => {
    expect(result.get(5)).toBe(0.5);
  });

  it("can calculate COS[90]", () => {
    expect(result.get(6)).toBe(0);
  });
});
