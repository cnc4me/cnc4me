import { Fences } from "./token.categories";
import { createToken } from "./token.utils";

const categories = Fences;

export const OpenParen = createToken({
  name: "OpenParen",
  pattern: "(",
  categories
});

export const CloseParen = createToken({
  name: "CloseParen",
  pattern: ")",
  categories
});

export const OpenBracket = createToken({
  name: "OpenBracket",
  pattern: "[",
  categories
});

export const CloseBracket = createToken({
  name: "CloseBracket",
  pattern: "]",
  categories
});
