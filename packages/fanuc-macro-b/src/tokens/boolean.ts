import { BooleanOperator, Keyword } from "./token.categories";
import { createToken } from "./token.utils";

const categories = [BooleanOperator, Keyword];

export const EqualTo = createToken({
  name: "EqualTo",
  pattern: /EQ/,
  categories
});

export const NotEqualTo = createToken({
  name: "NotEqualTo",
  pattern: /NE/,
  categories
});

export const LessThan = createToken({
  name: "LessThan",
  pattern: /LT/,
  categories
});

export const LessThanOrEq = createToken({
  name: "LessThanOrEq",
  pattern: /LE/,
  categories
});

export const GreaterThan = createToken({
  name: "GreaterThan",
  pattern: /GT/,
  categories
});

export const GreaterThanOrEq = createToken({
  name: "GreaterThanOrEq",
  pattern: /GE/,
  categories
});
