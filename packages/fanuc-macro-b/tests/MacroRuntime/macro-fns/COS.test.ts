import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../../src";

const code = `
#1=COS[5]
#2=COS[15]
#3=COS[30]
#4=COS[45]
#5=COS[60]
#6=COS[90]`;

describe("function: COS[]", () => {
  const runtime = new MacroRuntime();
  const { Memory } = runtime;

  runtime.evalLines(code);

  it("parses with no errors", () => {
    expect(runtime.hasErrors).toBeFalsy();
  });

  it("can calculate COS[5]", () => {
    expect(Memory.read(1)).toMatchWithinTolerance(0.99619, 1e-5);
  });

  it("can calculate COS[15]", () => {
    expect(Memory.read(2)).toMatchWithinTolerance(0.96593, 1e-5);
  });

  it("can calculate COS[30]", () => {
    expect(Memory.read(3)).toMatchWithinTolerance(0.86603, 1e-5);
  });

  it("can calculate COS[45]", () => {
    expect(Memory.read(4)).toMatchWithinTolerance(0.70711, 1e-5);
  });

  it("can calculate COS[60]", () => {
    expect(Memory.read(5)).toMatchWithinTolerance(0.5, 1e-14);
  });

  it("can calculate COS[90]", () => {
    expect(Memory.read(6)).toMatchWithinTolerance(0, 1e-16);
  });
});
