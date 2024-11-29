import { describe, expect, it } from "vitest";

import { Errors, MacroRuntime } from "../../src";

const program1 = `%
O0001 ( Program 1 )

M107
G0 G90 G54
M30
%`;

const program2 = `%
O0002 ( Program 2 )

M107
G0 G90 G55
M30
%`;

const program3 = `%
O0003 ( Program 3 )

M107
G0 G90 G56 ( IN LINE COMMENT )
M30
%`;

describe("parsing a simple program with the MacroRuntime", () => {
  const runtime = new MacroRuntime();

  runtime.loadProgram(program1);
  runtime.loadProgram(program2);
  runtime.loadProgram(program3);

  it("loads multiple programs", () => {
    expect(runtime.getProgramCount()).toBe(3);
  });

  it("activates programs by number", () => {
    runtime.setActiveProgram(1);
    expect(runtime.getActiveProgramNumber()).toBe(1);
    runtime.setActiveProgram(2);
    expect(runtime.getActiveProgramNumber()).toBe(2);
    runtime.setActiveProgram(3);
    expect(runtime.getActiveProgramNumber()).toBe(3);
  });
});

describe("errors trying to use a program number that does not exist", () => {
  const runtime = new MacroRuntime();

  it("cannot activate an undefined program", () => {
    expect(runtime.getProgramCount()).toBe(0);
    expect(() => runtime.setActiveProgram(9999)).toThrow(
      Errors.ProgramNumberNotFound
    );

    // expect(runtime.setActiveProgram(9999)).toBe(NaN);
  });

  it("cannot get the active program if none is active", () => {
    expect(runtime.getProgramCount()).toBe(0);
    expect(() => runtime.getActiveProgram()).toThrow(
      Errors.ProgramNumberNotFound
    );
    // expect(runtime.setActiveProgram(9999)).toBe(NaN);
  });
});
