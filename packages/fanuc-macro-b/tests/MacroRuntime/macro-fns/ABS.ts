import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../../src";

const code = `
#1=ABS[5]
#2=ABS[-5]`;

describe("function: ABS[]", () => {
  const runtime = new MacroRuntime();
  const { Memory } = runtime;

  runtime.evalLines(code);

  it("parses with no errors", () => {
    expect(runtime.hasErrors).toBeFalsy();
  });

  it("can calculate ABS[5]", () => {
    expect(Memory.read(1)).toBe(5);
  });

  it("can calculate ABS[-5]", () => {
    expect(Memory.read(2)).toBe(5);
  });
});
