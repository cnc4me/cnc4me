import { createToken } from "chevrotain";

export const OpenParen = createToken({
  name: "OpenParen",
  pattern: "("
});

export const CloseParen = createToken({
  name: "CloseParen",
  pattern: ")"
});

export const OpenBracket = createToken({
  name: "OpenBracket",
  pattern: "["
});

export const CloseBracket = createToken({
  name: "CloseBracket",
  pattern: "]"
});
