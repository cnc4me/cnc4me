import { NcParser } from "../../NcParser";

const simpleProgram = `%
:0491(9566-49_RA_OP1)
(DATE - JUN. 09 2020)
(TIME - 7:45 AM)
(MCX FILE - V:\\SH500\\JOB SPECIFIC\\9000-9999\\9566\\49\\9566-49_RA_OP1.MCAM)
(NC FILE - V:\\SH500\\JOB SPECIFIC\\9000-9999\\9566\\49\\9566-49_RA_OP1.NC)

( G53 )
G90 G10 L2 P0 X0. Y0. Z0. B0.
( G54 )
G90 G10 L2 P1 X-9.2545 Y-12.4306 Z-23.6695 B0.
( RESETS )
G17 G20 G40 G49 G54 G80 G90 G94

( USE TOOLEX )
( USE 1.625 PARALLELS )
( USE RH STOPS )
( MAT - AL 1 x 2 x 3)

M107
N115 ( 2.5" FACE MILL ALUMINUM )
T115 M106
M01 ( 2.5" FACE MILL ALUMINUM )
G0 G90 G54
%`;

const program = NcParser.parse(simpleProgram);

describe.skip(`program.getRegionFromLine()`, () => {
  //@ts-expect-error
  const region = program.getRegionFromLine(7);
  const regionArray = region.toArray();

  it(`has the right number of lines`, () => {
    expect(regionArray).toHaveLength(8);
  });

  it(`can be accessed via .length have comments extracted from the region`, () => {
    expect(regionArray).toHaveLength(8);
  });

  it(`has correct line[0]`, () => {
    expect(regionArray[0]).toBe("G53");
  });

  it(`has correct line[1]`, () => {
    expect(regionArray[1]).toBe("G90 G10 L2 P0 X0. Y0. Z0. B0.");
  });

  it(`has correct line[2]`, () => {
    expect(regionArray[2]).toBe("G54");
  });

  it(`has correct line[3]`, () => {
    expect(regionArray[3]).toBe(
      "G90 G10 L2 P1 X-9.2545 Y-12.4306 Z-23.6695 B0."
    );
  });

  it(`has correct line[4]`, () => {
    expect(regionArray[4]).toBe("G55");
  });

  it(`has correct line[5]`, () => {
    expect(regionArray[5]).toBe(
      "G90 G10 L2 P2 X-20.0995 Y-12.4306 Z-28.5145 B0."
    );
  });

  it(`has correct line[6]`, () => {
    expect(regionArray[6]).toBe("RESETS");
  });

  it(`has correct line[7]`, () => {
    expect(regionArray[7]).toBe("G17 G20 G40 G49 G54 G80 G90 G94");
  });

  it(`has can be output to NC format`, () => {
    const output = `( G53 )
G90 G10 L2 P0 X0. Y0. Z0. B0.
( G54 )
G90 G10 L2 P1 X-9.2545 Y-12.4306 Z-23.6695 B0.
( G55 )
G90 G10 L2 P2 X-20.0995 Y-12.4306 Z-28.5145 B0.
( RESETS )
G17 G20 G40 G49 G54 G80 G90 G94`;

    expect(region.toString()).toBe(output);
  });
});
