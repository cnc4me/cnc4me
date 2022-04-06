import { lines } from "../../src";

const code = `
#1=LN[5]
#2=LN[10]
#3=LN[49]
#4=LN[144]`;

describe("function: LN[]", () => {
  const { parser, interpreter } = lines(code);
  const { Memory } = interpreter;

  it("parses with no errors", () => {
    expect(parser.errors).toHaveLength(0);
  });

  it("can calculate LN[5]", () => {
    expect(Memory.read(1)).toBeWithinTolerance(1.60944, 1e-5);
  });

  it("can calculate LN[36]", () => {
    expect(Memory.read(2)).toBeWithinTolerance(2.30259, 1e-5);
  });

  it("can calculate LN[49]", () => {
    expect(Memory.read(3)).toBeWithinTolerance(3.891825, 1e-5);
  });

  it("can calculate LN[144]", () => {
    expect(Memory.read(4)).toBeWithinTolerance(4.96981, 1e-5);
  });
});
