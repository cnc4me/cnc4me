import { beforeEach, describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

describe("conditionally set a register with IF / THEN", () => {
  const runtime = new MacroRuntime();

  beforeEach(() => runtime.reset());

  it(`evaluates GT as true`, () => {
    runtime.mdi(
      `#1=1
#2=2
#3=0
IF[#2 GT #1] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(1);
  });

  it(`evaluates GT as false`, () => {
    runtime.mdi(
      `#1=1
#2=2
#3=0
IF[#1 GT #2] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(0);
  });

  it(`evaluates LT as true`, () => {
    runtime.mdi(
      `#1=1
#2=2
#3=0
IF[#1 LT #2] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(1);
  });

  it(`evaluates LT as false`, () => {
    runtime.mdi(
      `#1=1
#2=2
#3=0
IF[#2 LT #1] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(0);
  });

  it(`evaluates GE as true`, () => {
    runtime.mdi(
      `#1=2
#2=2
#3=0
IF[#2 GE #1] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(1);
  });

  it(`evaluates GE as false`, () => {
    runtime.mdi(
      `#1=3
#2=2
#3=0
IF[#2 GE #1] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(0);
  });

  it(`evaluates LE as true`, () => {
    runtime.mdi(
      `#1=2
#2=2
#3=0
IF[#1 LE #2] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(1);
  });

  it(`evaluates LE as false`, () => {
    runtime.mdi(
      `#1=3
#2=2
#3=0
IF[#1 LE #2] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(0);
  });

  it(`evaluates EQ as true`, () => {
    runtime.mdi(
      `#1=2
#2=2
#3=0
IF[#1 EQ #2] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(1);
  });

  it(`evaluates EQ as false`, () => {
    runtime.mdi(
      `#1=3
#2=2
#3=0
IF[#1 EQ #2] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(0);
  });

  it(`evaluates NE as true`, () => {
    runtime.mdi(
      `#1=3
#2=2
#3=0
IF[#1 NE #2] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(1);
  });

  it(`evaluates NE as false`, () => {
    runtime.mdi(
      `#1=2
#2=2
#3=0
IF[#1 NE #2] THEN #3=1`
    );

    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.Memory.read(3)).toBe(0);
  });
});
