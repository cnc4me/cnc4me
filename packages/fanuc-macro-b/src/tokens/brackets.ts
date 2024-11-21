import { createToken } from "chevrotain";

import { Grouping } from "./common";

const SHARED_CONFIG = {
  group: "Grouping",
  categories: Grouping
};

export const OpenParen = createToken({
  name: "OpenParen",
  pattern: "(",
  ...SHARED_CONFIG
});

export const CloseParen = createToken({
  name: "CloseParen",
  pattern: ")",
  ...SHARED_CONFIG
});

export const OpenBracket = createToken({
  name: "OpenBracket",
  pattern: "[",
  ...SHARED_CONFIG
});

export const CloseBracket = createToken({
  name: "CloseBracket",
  pattern: "]",
  ...SHARED_CONFIG
});
