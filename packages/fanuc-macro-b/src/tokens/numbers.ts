import { NumericValue } from "./token.categories";
import { createToken } from "./token.utils";

const categories = NumericValue;

export const Integer = createToken({
  name: "Integer",
  pattern: /\d+/,
  categories
});

// Borrowed the regex from https://stackoverflow.com/a/13252134
export const Decimal = createToken({
  name: "Decimal",
  pattern: /(?=\d*[.])([0-9]+\.?[0-9]*|\.[0-9]+)/,
  longer_alt: Integer,
  categories
});
