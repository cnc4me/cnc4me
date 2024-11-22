import { createToken } from "./_helpers";
import { ControlFlowKeyword } from "./common";

/**
 * 11/20/2024 - Learned that applying a group to tokens
 * moves them from result.tokens to result.groups[GROUP]
 */
const SHARED_CONFIG = {
  // group: "ControlFlow",
  categories: ControlFlowKeyword
};

export const GotoLine = createToken({
  name: "GotoLine",
  pattern: /GOTO[1-9][0-9]*/,
  ...SHARED_CONFIG
});

export const If = createToken({
  name: "If",
  pattern: /IF/,
  ...SHARED_CONFIG
});

export const Then = createToken({
  name: "Then",
  pattern: /THEN/,
  ...SHARED_CONFIG
});

export const Do = createToken({
  name: "Do",
  pattern: /DO/,
  ...SHARED_CONFIG
});

export const While = createToken({
  name: "While",
  pattern: /WHILE/,
  ...SHARED_CONFIG
});
