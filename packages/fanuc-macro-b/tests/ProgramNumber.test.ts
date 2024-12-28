import { describe, expect, it } from "vitest";

import ProgramNumber from "../src/lib/ProgramNumber";

describe("running a simple program with the MacroRuntime", () => {
  it("can test valid program numbers", () => {
    const result = ProgramNumber.isValid("O0324");
    expect(result).toBeTruthy();
    expect(result?.[0]).toBeTruthy();
    expect(result?.[0]).toBe("O0324");
    expect(result?.[1]).toBe("0324");
  });

  it("can test invalid program numbers", () => {
    expect(ProgramNumber.isValid("burrito")).toBeFalsy();
  });

  it("matches a program number", () => {
    expect(ProgramNumber.match("O1234")).toBe(1234);
  });

  it("fails to match a program number", () => {
    expect(ProgramNumber.match("taco")).toBeNull();
  });
});
