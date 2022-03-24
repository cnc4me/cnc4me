import { analyze } from "../src";

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

describe("program Validator", () => {
  const { result, parseErrors, lexingErrors } = analyze(NC_SAMPLE);

  it("will lex with no errors", () => {
    expect(lexingErrors).toHaveLength(0);
  });

  it("will parse with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can extract the program number and title", () => {
    expect(result.programNumber).toBe(9901);
    expect(result.programTitle).toBe("PALLET RUNNER");
  });
});
