import { createToken } from "chevrotain";

import { BuiltinFunction } from "./functions";
import { matchProgramNumber } from "./matchers";

export const Gcode = createToken({
  name: "G_Code",
  pattern: /G\d+(\.\d+)?/
});

export const Mcode = createToken({
  name: "M_Code",
  pattern: /M\d+(\.)?/
});

export const LineNumber = createToken({
  name: "LineNumber",
  pattern: /N\d+/
});

export const ProgramNumber = createToken({
  name: "ProgramNumber",
  pattern: matchProgramNumber,
  line_breaks: true
  // pattern: /[O|:](\d+)/,
  // longer_alt: Address
});

export const Address = createToken({
  name: "Address",
  pattern: /[A-Z]/,
  longer_alt: [BuiltinFunction, Gcode, Mcode, LineNumber, ProgramNumber]
});
