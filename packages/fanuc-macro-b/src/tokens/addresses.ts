import { createToken } from "./token.utils";

export const Address = createToken({
  name: "Address",
  pattern: /[A-Z]/
});

export const Gcode = createToken({
  name: "G_Code",
  pattern: /G\d+(\.\d+)?/,
  longer_alt: [Address]
});

export const Mcode = createToken({
  name: "M_Code",
  pattern: /M\d+(\.)?/,
  longer_alt: [Address]
});

export const LineNumber = createToken({
  name: "LineNumber",
  pattern: /N\d+/,
  longer_alt: [Address]
});

export const ProgramNumber = createToken({
  name: "ProgramNumber",
  pattern: /O\d+/,
  longer_alt: [Address]
});
