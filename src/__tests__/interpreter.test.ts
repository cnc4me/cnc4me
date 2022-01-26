import { interpret } from "../utils";

const NC_SAMPLE = `%
O9901 (PALLET RUNNER)
(PRELOAD OFFSETS)
G10G90L2P1X1.2Y3.4Z5.6B7.8
N10T47M6
N20S50 (SPINDLE SAFETY)
N40M22
N50B0
N60M21
G43H#518Z1.1
N80M5
N90G91G28Z0.1
N100M30
%`;

describe("Fanuc Macro B Interpreter", () => {
  it("Can extract the program number and title", () => {
    const { result, parseErrors, lexResult } = interpret(NC_SAMPLE);
    const { groups } = lexResult;

    expect(parseErrors).toHaveLength(0);
    expect(result.ProgramNumber[0].payload).toEqual(9901);
    expect(groups.comments[0].image).toEqual("(PALLET RUNNER)");
  });

  it("Can extract all comments", () => {
    const { lexResult, parseErrors } = interpret(NC_SAMPLE);
    const { groups } = lexResult;

    expect(parseErrors).toHaveLength(0);
    expect(groups.comments).toHaveLength(3);
    expect(groups.comments[0].image).toEqual("(PALLET RUNNER)");
    expect(groups.comments[1].image).toEqual("(PRELOAD OFFSETS)");
    expect(groups.comments[2].image).toEqual("(SPINDLE SAFETY)");
  });

  it.skip("can assign a variable a value", () => {
    const { result } = interpret("#501=12.3456");

    expect(result).toEqual(3);
  });

  it.skip("can fetch a variable value for an address", () => {
    const { result } = interpret("H#518");

    expect(result).toEqual(3);
  });

  it.skip("can calculate an expression", () => {
    const { result } = interpret("X[1.25 + 2.5]");

    expect(result).toEqual(3);
  });
});
