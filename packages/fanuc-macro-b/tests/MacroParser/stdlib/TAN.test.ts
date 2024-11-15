import { describe, expect, it } from "vitest";

import { lines } from "../../../src";

const code = `
#1=TAN[5]
#2=TAN[15]
#3=TAN[30]
#4=TAN[45]
#5=TAN[60]
#6=TAN[135]`;

describe("function: TAN[]", () => {
  const { runtime } = lines(code);
  const parser = runtime.Parser;
  const Memory = runtime.Memory;

  it("parses with no errors", () => {
    expect(parser.errors).toHaveLength(0);
  });

  it("can calculate TAN[5]", () => {
    expect(Memory.read(1)).toMatchWithinTolerance(0.08749, 1e-5);
  });

  it("can calculate TAN[15]", () => {
    expect(Memory.read(2)).toMatchWithinTolerance(0.26795, 1e-5);
  });

  it("can calculate TAN[30]", () => {
    expect(Memory.read(3)).toMatchWithinTolerance(0.57735, 1e-5);
  });

  it("can calculate TAN[45]", () => {
    expect(Memory.read(4)).toMatchWithinTolerance(1, 1e-14);
  });

  it("can calculate TAN[60]", () => {
    expect(Memory.read(5)).toMatchWithinTolerance(1.73205, 1e-5);
  });

  it("can calculate TAN[135]", () => {
    expect(Memory.read(6)).toMatchWithinTolerance(-1, 1e-14);
  });
});
