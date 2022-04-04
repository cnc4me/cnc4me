import { G10Line } from "../G10Line";

describe("testing the MacroMemory's *WorkOffset* methods", () => {
  it("can set `G54` and read it's offsets.", () => {
    const G10_LINE = "G10 L2 P3 X7.5 Y21.5189 Z3.0025 B270.";
    const result = G10Line.parse(G10_LINE);

    expect(result).toMatchObject({
      error: null,
      result: {
        L: 2,
        P: 3,
        X: 7.5,
        Y: 21.5189,
        Z: 3.0025,
        B: 270
      }
    });
  });
});
