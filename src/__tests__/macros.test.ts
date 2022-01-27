import { interpret } from "../utils";

const code = `#1=10
#2=0.5
#3=4.75
#4=-7.349
#5=#1
#6=#4+#3
#7=#1-#3
#8=#1+#1
#9=#1*#5
#10=#3/#2`;

describe("Fanuc Macro B Interpreter", () => {
  const { interpreter, parseErrors } = interpret(code, "lines");
  const result = interpreter.getMacros();

  it("can run with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can interpret variable assignments", () => {
    expect(result.get(1)).toBe(10);
    expect(result.get(2)).toBe(0.5);
    expect(result.get(3)).toBe(4.75);
    expect(result.get(4)).toBe(-7.349);
    expect(result.get(5)).toBe(10);
  });

  it("Can interpret basic variable expressions", () => {
    // expect(result.get(6)).toBe(-3.1145);
    expect(result.get(7)).toBe(5.25);
    expect(result.get(8)).toBe(20);
    expect(result.get(9)).toBe(100);
    expect(result.get(10)).toBe(9.5);
  });
});
