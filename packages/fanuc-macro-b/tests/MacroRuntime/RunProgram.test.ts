import { beforeAll, beforeEach, describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const TEST_PROGRAM_NUMBER = 2595;

const SAMPLE_CODE = `%
O${TEST_PROGRAM_NUMBER} (example)
(header)

T43 M6 ( #14 [.182"] DRILL, CARB, TSC )
G0 G90 G54 X1.75 Y.19 S10495 M3
M8 (COOLANT ON)
G4 X2.
G43 H43 Z1.
G98 G83 Z-.5631 Q.3 R.1 F21.
X.75
Y1.81
X1.75
G80
G91 G28 Z0.
M30
%`;

const runtime = MacroRuntime.create({ loadAndActivate: SAMPLE_CODE });

describe("running a simple program with the MacroRuntime", () => {
  // beforeAll(() => runtime.run());

  it("loads and activates a program", () => {
    expect(runtime.getProgramCount()).toBe(1);
    expect(runtime.getActiveProgramNumber()).toBe(TEST_PROGRAM_NUMBER);
  });
});
