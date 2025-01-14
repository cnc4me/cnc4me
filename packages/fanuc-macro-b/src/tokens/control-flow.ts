import { Address, Gcode } from "./addresses";
import { ControlFlowKeyword, Keyword } from "./token.categories";
import { createToken } from "./token.utils";

const categories = [ControlFlowKeyword, Keyword];
const sharedConfig = { categories, longer_alt: [Address] };

export const GotoLine = createToken({
  name: "GotoLine",
  pattern: /GOTO/,
  categories,
  longer_alt: [Gcode]
});

export const If = createToken({
  name: "If",
  pattern: /IF/,
  ...sharedConfig
});

export const Then = createToken({
  name: "Then",
  pattern: /THEN/,
  ...sharedConfig
});

export const Do = createToken({
  name: "Do",
  pattern: /DO/,
  ...sharedConfig
});

export const While = createToken({
  name: "While",
  pattern: /WHILE/,
  ...sharedConfig
});

export const End = createToken({
  name: "End",
  pattern: /END/,
  ...sharedConfig
});
