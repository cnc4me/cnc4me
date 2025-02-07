import { beforeEach } from "node:test";

import { beforeAll, describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const multiProgram = `%
O1111 ( Program 1 )
M107
G0 G90 G54
M30
%

%
O2222 ( Program 2 )
M107
G0 G90 G55
M30
%

%
O3333 ( Program 3 )
M107
G0 G90 G56 ( IN LINE COMMENT )
M30
%
`;

const runtime = new MacroRuntime();

describe.skip("Loading multiple programs with the MacroRuntime", () => {
  beforeEach(() => runtime.reset());
  runtime.loadProgram(multiProgram);

  it("loads multiple programs in one file", () => {
    expect(runtime.getProgramCount()).toBe(3);
  });
});
