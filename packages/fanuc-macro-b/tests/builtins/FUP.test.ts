import { lines } from "../../src";

const code = `
#1=FUP[5.251]
#2=FUP[-2.136]
#3=FUP[0.001]
#4=FUP[9.004]`;

describe("function: FUP[]", () => {
  const { parser, interpreter } = lines(code);
  const { Memory } = interpreter;

  it("parses with no errors", () => {
    expect(parser.errors).toHaveLength(0);
  });

  it("can calculate FUP[5.251]", () => {
    expect(Memory.read(1)).toBe(6);
  });

  it("can calculate FUP[-2.136]", () => {
    expect(Memory.read(2)).toBe(-2);
  });

  it("can calculate FUP[0.001]", () => {
    expect(Memory.read(3)).toBe(1);
  });

  it("can calculate FUP[9.004]", () => {
    expect(Memory.read(4)).toBe(10);
  });
});
