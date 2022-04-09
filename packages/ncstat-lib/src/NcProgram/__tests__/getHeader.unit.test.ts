/* eslint-disable no-useless-escape */
import { NcParser } from "../../NcParser";

const simpleProgram = `%
O1234 (SIMPLE)
(DATE | JUN. 06 2020)
(TIME | 9:02 AM)
(MCX FILE | V:\TEST\EXAMPLE\SIMPLE.MCAM)
(NC FILE | V:\TEST\EXAMPLE\SIMPLE.NC)

N43 ( #14 [.182"] DRILL, CARB, TSC )
M30
%`;

const program = NcParser.parse(simpleProgram);

describe(`Header`, () => {
  program.defaults.headerSeparator = " | ";

  const header = program.getHeader();

  it(`is 4 lines long`, () => {
    expect(header).toHaveLength(4);
  });

  it(`has the correct 1st line`, () => {
    expect(header[0]).toBe(`DATE | JUN. 06 2020`);
  });

  it(`has the correct 2nd line`, () => {
    expect(header[1]).toBe(`TIME | 9:02 AM`);
  });

  it(`has the correct 3rd line`, () => {
    expect(header[2]).toBe(`MCX FILE | V:\TEST\EXAMPLE\SIMPLE.MCAM`);
  });

  it(`has the correct 4th line`, () => {
    expect(header[3]).toBe(`NC FILE | V:\TEST\EXAMPLE\SIMPLE.NC`);
  });

  it(`can be queried, prg.queryHeader("TIME")`, () => {
    expect(program.queryHeader("TIME")).toBe(`9:02 AM`);
  });

  it(`can be accessed as an object, prg.header.DATE;`, () => {
    expect(program.header.DATE).toBe(`JUN. 06 2020`);
  });

  it(`can be accessed as an array, prg.header["NC FILE"];`, () => {
    expect(program.header["NC FILE"]).toBe(`V:\TEST\EXAMPLE\SIMPLE.NC`);
  });
});
