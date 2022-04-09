import { NcParser } from "../NcParser";

const source = `%
O5678 (BASIC2)
( JUST A COMMENT )
M30
%`;

const program = NcParser.parse(source);

it(`should be program number 5678`, () => {
  expect(program.number).toBe(5678);
});
