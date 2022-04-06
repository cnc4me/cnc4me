import { lines } from "../../src";

const code = `
#1=FIX[5.251]
#2=FIX[-2.136]
#3=FIX[0.001]
#4=FIX[100]`;

describe("function: FIX[]", () => {
  const { parser, interpreter } = lines(code);
  const { Memory } = interpreter;

  it("parses with no errors", () => {
    expect(parser.errors).toHaveLength(0);
  });

  it("can calculate FIX[5.251]", () => {
    expect(Memory.read(1)).toBe(5);
  });

  it("can calculate FIX[-2.736]", () => {
    expect(Memory.read(2)).toBe(-3);
  });

  it("can calculate FIX[0.001]", () => {
    expect(Memory.read(3)).toBe(0);
  });

  it("can calculate FIX[100]", () => {
    expect(Memory.read(4)).toBe(100);
  });
});
