import { createToken } from "chevrotain";
import { Brackets } from "./categories";
export const OpenParen = createToken({
    name: "OpenParen",
    pattern: "("
});
export const CloseParen = createToken({
    name: "CloseParen",
    pattern: ")"
});
export const OpenBracket = createToken({
    name: "OpenBracket",
    pattern: "[",
    categories: Brackets
});
export const CloseBracket = createToken({
    name: "CloseBracket",
    pattern: "]",
    categories: Brackets
});
