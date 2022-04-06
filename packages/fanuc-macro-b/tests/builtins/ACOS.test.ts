import { lines } from "../../src";

const code = `
#1=ACOS[1]
#2=ACOS[-1]
#3=ACOS[${Math.sqrt(2) / 2}]
#4=ACOS[${Math.sqrt(3) / 2}]
#5=ACOS[.5]`;

describe("function: ACOS[]", () => {
  const { parser, interpreter } = lines(code);
  const { Memory } = interpreter;

  it("parses with no errors", () => {
    expect(parser.errors).toHaveLength(0);
  });

  it("can calculate ACOS[1]", () => {
    expect(Memory.read(1)).toBe(0);
  });

  it("can calculate ACOS[-1]", () => {
    expect(Memory.read(2)).toBe(180);
  });

  it("can calculate ACOS[x] (√2 / 2)", () => {
    expect(Memory.read(3)).toBe(45);
  });

  it("can calculate ACOS[x] (√3 / 2)", () => {
    expect(Memory.read(4)).toBeWithinTolerance(30, 1e-14);
  });

  it("can calculate ACOS[.5]", () => {
    expect(Memory.read(5)).toBeWithinTolerance(60, 1e-14);
  });
});
