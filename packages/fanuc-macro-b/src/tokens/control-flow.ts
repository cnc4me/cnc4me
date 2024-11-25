import { ControlFlowKeyword, Keyword } from "./token.categories";
import { createToken } from "./token.utils";

const categories = [ControlFlowKeyword, Keyword];

export const GotoLine = createToken({
  name: "GotoLine",
  pattern: /GOTO[1-9][0-9]*/,
  categories
});

export const If = createToken({
  name: "If",
  pattern: /IF/,
  categories
});

export const Then = createToken({
  name: "Then",
  pattern: /THEN/,
  categories
});

export const Do = createToken({
  name: "Do",
  pattern: /DO/,
  categories
});

export const While = createToken({
  name: "While",
  pattern: /WHILE/,
  categories
});
