import { beforeEach, describe, expect, it } from "vitest";

import { ProgramNumber } from "../src/lib/ProgramNumber";

describe("running a simple program with the MacroRuntime", () => {
  it("knows valid program numbers", () => {
    expect(ProgramNumber.isValid("O9999")).toBeTruthy();
  });

  it("matches a program number", () => {
    const matcher = ProgramNumber.create({
      onMatch: programNumber => expect(programNumber).toBe(1234)
    });

    matcher.match("O1234");
  });

  it("fails to match a program number", () => {
    const matcher = ProgramNumber.create({
      onFail: err => expect(err).toBeInstanceOf(Error)
    });

    matcher.match("Tacos");
  });
});
