import { describe, expect, it } from "vitest";

import { lines } from "../../../src";

const code = `
#1=SQRT[2]
#2=SQRT[36]
#3=SQRT[49]
#4=SQRT[144]
#5=SQRT[3173]`;

describe("function: SQRT[]", () => {
  const { runtime } = lines(code);
  const parser = runtime.Parser;
  const Memory = runtime.Memory;

  it("parses with no errors", () => {
    expect(parser.errors).toHaveLength(0);
  });

  it("can calculate SQRT[2]", () => {
    expect(Memory.read(1)).toMatchWithinTolerance(1.41421, 1e-5);
    expect(Memory.read(1)).not.toMatchWithinTolerance(1.41421, 1e-6);
  });

  it("can calculate SQRT[36]", () => {
    expect(Memory.read(2)).toBe(6);
  });

  it("can calculate SQRT[49]", () => {
    expect(Memory.read(3)).toBe(7);
  });

  it("can calculate SQRT[144]", () => {
    expect(Memory.read(4)).toBe(12);
  });

  it("can calculate SQRT[3173]", () => {
    expect(Memory.read(5)).toMatchWithinTolerance(56.32939, 1e-5);
  });
});
