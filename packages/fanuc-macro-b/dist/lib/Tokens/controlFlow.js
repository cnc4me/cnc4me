import { createToken } from "chevrotain";
import { ControlFlowKeyword } from "./categories";
import { Address } from "./tokens";
export const GotoLine = createToken({
    name: "GotoLine",
    pattern: /GOTO[1-9][0-9]*/,
    longer_alt: Address,
    categories: ControlFlowKeyword
});
export const If = createToken({
    name: "If",
    pattern: /IF/,
    longer_alt: Address,
    categories: ControlFlowKeyword
});
export const Then = createToken({
    name: "Then",
    pattern: /THEN/,
    longer_alt: Address,
    categories: ControlFlowKeyword
});
export const Do = createToken({
    name: "Do",
    pattern: /DO/,
    longer_alt: Address,
    categories: ControlFlowKeyword
});
export const While = createToken({
    name: "While",
    pattern: /WHILE/,
    longer_alt: Address,
    categories: ControlFlowKeyword
});
