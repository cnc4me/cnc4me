import { lines } from "../../src";

const code = `
#1=ABS[5]
#2=ABS[-5]`;

describe("function: ABS[]", () => {
  const { parser, interpreter } = lines(code);
  const { Memory } = interpreter;

  it("parses with no errors", () => {
    expect(parser.errors).toHaveLength(0);
  });

  it("can calculate ABS[5]", () => {
    expect(Memory.read(1)).toBe(5);
  });

  it("can calculate ABS[-5]", () => {
    expect(Memory.read(2)).toBe(5);
  });
});
