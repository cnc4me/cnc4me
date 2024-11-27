import { BooleanOperator, Keyword } from "./token.categories";
import { createToken } from "./token.utils";

const categories = [BooleanOperator, Keyword];

export const Or = createToken({
  name: "Or",
  pattern: /OR/,
  categories
});

export const And = createToken({
  name: "And",
  pattern: /AND/,
  categories
});

export const XOr = createToken({
  name: "XOr",
  pattern: /XOR/,
  categories
});
