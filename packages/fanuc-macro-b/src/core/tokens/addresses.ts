import { createToken, Keyword } from "./token.utils";

export const Address = createToken({
  name: "Address",
  pattern: /[A-Z]/,
});

const sharedConfig = {
  longer_alt: Address,
  categories: Keyword,
};

export const Gcode = createToken({
  name: "G_Code",
  pattern: /G\d+(\.\d+)?/,
  ...sharedConfig,
});

export const Mcode = createToken({
  name: "M_Code",
  pattern: /M\d+(\.)?/,
  ...sharedConfig,
});

export const LineNumber = createToken({
  name: "LineNumber",
  pattern: /N\d+/,
  ...sharedConfig,
});

export const ProgramNumber = createToken({
  name: "ProgramNumber",
  pattern: /O\d+/,
  ...sharedConfig,
});
