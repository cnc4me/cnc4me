import { lines } from "../../src";

const code = `
#1=COS[5]
#2=COS[15]
#3=COS[30]
#4=COS[45]
#5=COS[60]
#6=COS[90]`;

describe("function: COS[]", () => {
  const { parser, interpreter } = lines(code);
  const { Memory } = interpreter;

  it("parses with no errors", () => {
    expect(parser.errors).toHaveLength(0);
  });

  it("can calculate COS[5]", () => {
    expect(Memory.read(1)).toBeWithinTolerance(0.99619, 1e-5);
  });

  it("can calculate COS[15]", () => {
    expect(Memory.read(2)).toBeWithinTolerance(0.96593, 1e-5);
  });

  it("can calculate COS[30]", () => {
    expect(Memory.read(3)).toBeWithinTolerance(0.86603, 1e-5);
  });

  it("can calculate COS[45]", () => {
    expect(Memory.read(4)).toBeWithinTolerance(0.70711, 1e-5);
  });

  it("can calculate COS[60]", () => {
    expect(Memory.read(5)).toBeWithinTolerance(0.5, 1e-14);
  });

  it("can calculate COS[90]", () => {
    expect(Memory.read(6)).toBeWithinTolerance(0, 1e-16);
  });
});
