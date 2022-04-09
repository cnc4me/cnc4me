import { NcParser } from "../../NcParser";

const source = `%
:0491(9566-49_RA_OP1)
(DATE - JUN. 09 2020)
(TIME - 7:45 AM)
(MCX FILE - V:\\SH500\\JOB SPECIFIC\\9000-9999\\9566\\49\\9566-49_RA_OP1.MCAM)
(NC FILE - V:\\SH500\\JOB SPECIFIC\\9000-9999\\9566\\49\\9566-49_RA_OP1.NC)

( G53 )
G90 G10 L2 P0 X0. Y0. Z0. B0.
( G54 )
G90 G10 L2 P1 X-9.2545 Y-12.4306 Z-23.6695 B0.
( G55 )
G90 G10 L2 P2 X-20.0995 Y-12.4306 Z-28.5145 B0.
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

const program = NcParser.parse(source);

describe(`"Header" sections of the program`, () => {
  describe(`first region, identified as the "header"`, () => {
    it(`is 4 lines long`, () => {
      expect(program.getHeader()).toHaveLength(4);
    });
  });

  describe(`second region, identified as the "subheader"`, () => {
    it(`is 8 lines long`, () => {
      expect(program.getSubHeader()).toHaveLength(8);
    });
  });

  describe(`third section, identified as "notes"`, () => {
    it(`is 4 lines long`, () => {
      expect(program.getNotes()).toHaveLength(4);
    });
  });

  describe(`"USE" regions / comments`, () => {
    it(`can have "( USES ... )" comments extracted`, () => {
      expect(program.uses).toHaveLength(3);
    });

    it(`has uses comments extracted`, () => {
      expect(program.uses[0]).toBe("TOOLEX");
      expect(program.uses[1]).toBe("1.625 PARALLELS");
      expect(program.uses[2]).toBe("RH STOPS");
    });
  });
});
