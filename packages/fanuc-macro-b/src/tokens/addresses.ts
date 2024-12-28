import { BuiltinFunction } from "./functions";
import { matchProgramNumber } from "./matchers";
import { Modulus } from "./operators";
import { createToken } from "./token.utils";

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

// @TODO investigate if the custom matcher is needed.
// Can the parser turn an address token with image "O" and a number into a "program number"?
export const ProgramNumber = createToken({
  name: "ProgramNumber",
  pattern: matchProgramNumber,
  line_breaks: true
  // pattern: /[O|:](\d+)/,
  // longer_alt: Address
});

// export const ProgramNumber = createToken({
//   name: "ProgramNumber",
//   pattern: /[O|:]\d+/
// });

export const Address = createToken({
  name: "Address",
  pattern: /[A-Z]/,
  longer_alt: [
    BuiltinFunction,
    Modulus,
    Gcode,
    Mcode,
    LineNumber,
    ProgramNumber
  ]
});
