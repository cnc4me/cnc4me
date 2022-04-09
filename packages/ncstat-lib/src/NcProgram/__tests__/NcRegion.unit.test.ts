import { NcParser } from "../../NcParser";
import { NcRegion } from "../NcRegion";

const source = `%
:1234 (TEST)
(DATE - JUN. 09 2020)
(TIME - 7:45 AM)
(MATERIAL - AL 1" X 2" X 3")

(Region #2)
(Region #2)

(Region #3)
(Region #3)
(Region #3)

(Region #4)
(Region #4)
(Region #4)
(Region #4)

M107
N115 ( 2.5" FACE MILL ALUMINUM )
T115 M106
M01 ( 2.5" FACE MILL ALUMINUM )
G0 G90 G54
%`;

const BLANK_LINES = [5, 8, 12, 17];
const REGION_SPANS = [
  { from: 2, to: 4 },
  { from: 6, to: 7 },
  { from: 9, to: 11 },
  { from: 13, to: 16 },
  { from: 18, to: 22 }
];

/**
 * Ignoring "%"s as a line, we start numbering "program lines" in a logical
 * way, starting from 1 as the program number and name line
 */
describe(`NcRegions`, () => {
  const program = NcParser.parse(source);

  it(`should have the right number of values`, () => {
    expect(program.blankLines).toHaveLength(4);
  });

  it(`has the right line numbers`, () => {
    expect(program.blankLines).toEqual(BLANK_LINES);
  });

  it(`has the right region count`, () => {
    expect(program.regionSpans).toHaveLength(5);
  });

  it(`has the right line number spans`, () => {
    expect(program.regionSpans).toEqual(REGION_SPANS);
  });

  describe(`program.getRegions()`, () => {
    const regions = program.getRegions();

    it("should be an array of NcRegions", () => {
      expect(
        regions.every(region => region instanceof NcRegion)
      ).toBeTruthy();
    });

    describe("1st NcRegion (regions[0])", () => {
      it("should have 3 lines", () => {
        expect(regions[0]).toHaveLength(3);
      });

      it("should start on the correct line", () => {
        expect(regions[0].start).toBe(2);
      });

      it("should end on the correct line", () => {
        expect(regions[0].end).toBe(4);
      });
    });

    describe("2nd NcRegion (regions[1])", () => {
      it("should have 2 lines", () => {
        expect(regions[1]).toHaveLength(2);
      });

      it("should start on the correct line", () => {
        expect(regions[1].start).toBe(6);
      });

      it("should end on the correct line", () => {
        expect(regions[1].end).toBe(7);
      });
    });

    describe("3nd NcRegion (regions[2])", () => {
      it("should have 3 lines", () => {
        expect(regions[2]).toHaveLength(3);
      });

      it("should start on the correct line", () => {
        expect(regions[2].start).toBe(9);
      });

      it("should end on the correct line", () => {
        expect(regions[2].end).toBe(11);
      });
    });

    describe("4th NcRegion (regions[3])", () => {
      it("should have 4 lines", () => {
        expect(regions[3]).toHaveLength(4);
      });

      it("should start on the correct line3", () => {
        expect(regions[3].start).toBe(13);
      });

      it("should end on the correct line6", () => {
        expect(regions[3].end).toBe(16);
      });
    });

    describe("5th NcRegion (regions[4])", () => {
      it("should have 5 lines", () => {
        expect(regions[4]).toHaveLength(5);
      });

      it("should start on the correct line4", () => {
        expect(regions[4].start).toBe(18);
      });

      it("should end on the correct line6", () => {
        expect(regions[4].end).toBe(22);
      });
    });
  });
});
