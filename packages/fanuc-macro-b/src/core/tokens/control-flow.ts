import { Address, Gcode } from "./addresses";
import { createToken, Keyword } from "./token.utils";

export const GotoLine = createToken({
  name: "GotoLine",
  pattern: /GOTO/,
  longer_alt: [Gcode, Address],
  categories: Keyword,
});

export const If = createToken({
  name: "If",
  pattern: /IF/,
  longer_alt: Address,
  categories: Keyword,
});

export const Then = createToken({
  name: "Then",
  pattern: /THEN/,
  longer_alt: Address,
  categories: Keyword,
});

export const Do = createToken({
  name: "Do",
  pattern: /DO/,
  longer_alt: Address,
  categories: Keyword,
});

export const While = createToken({
  name: "While",
  pattern: /WHILE/,
  longer_alt: Address,
  categories: Keyword,
});

export const End = createToken({
  name: "End",
  pattern: /END/,
  longer_alt: Address,
  categories: Keyword,
});
