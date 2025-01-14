import { Address } from "./addresses";
import { BooleanOperator, Keyword } from "./token.categories";
import { createToken } from "./token.utils";

const categories = [BooleanOperator, Keyword];
const sharedConfig = { categories, longer_alt: [Address] };

export const EqualTo = createToken({
  name: "EqualTo",
  pattern: /EQ/,
  ...sharedConfig
});

export const NotEqualTo = createToken({
  name: "NotEqualTo",
  pattern: /NE/,
  ...sharedConfig
});

export const LessThan = createToken({
  name: "LessThan",
  pattern: /LT/,
  ...sharedConfig
});

export const LessThanOrEq = createToken({
  name: "LessThanOrEq",
  pattern: /LE/,
  ...sharedConfig
});

export const GreaterThan = createToken({
  name: "GreaterThan",
  pattern: /GT/,
  ...sharedConfig
});

export const GreaterThanOrEq = createToken({
  name: "GreaterThanOrEq",
  pattern: /GE/,
  ...sharedConfig
});
