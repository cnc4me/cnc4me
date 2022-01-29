import { validate } from "../utils";

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

describe("Program Validator", () => {
  const { result, parseErrors, lexResult } = validate(NC_SAMPLE);
  const { groups } = lexResult;

  it.skip("will validate a program with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it.skip("Can extract the program number and title", () => {
    expect(result.ProgramNumber[0].payload).toEqual(9901);
    expect(groups.comments[0].image).toEqual("(PALLET RUNNER)");
  });

  it("Can extract all comments", () => {
    const { comments } = groups;

    expect(comments).toHaveLength(3);
    expect(comments[0].image).toEqual("(PALLET RUNNER)");
    expect(comments[1].image).toEqual("(PRELOAD OFFSETS)");
    expect(comments[2].image).toEqual("(SPINDLE SAFETY)");
  });
});
