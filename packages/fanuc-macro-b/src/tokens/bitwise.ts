import { Address } from "./addresses";
import { BooleanOperator, Keyword } from "./token.categories";
import { createToken } from "./token.utils";

const categories = [BooleanOperator, Keyword];

export const Or = createToken({
  name: "Or",
  pattern: /OR/,
  categories,
  longer_alt: [Address]
});

export const And = createToken({
  name: "And",
  pattern: /AND/,
  categories,
  longer_alt: [Address]
});

export const XOr = createToken({
  name: "XOr",
  pattern: /XOR/,
  categories,
  longer_alt: [Address]
});
