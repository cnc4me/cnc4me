import type { AddressInsight } from "../lib";
import { createToolchain } from "../utils";
export declare type OneOrMany<T> = T | T[];
export declare type ErrorHandler<E, R> = (err: E, result: R) => void;
export declare type WithInput<T, I> = T & {
    input: I;
};
export declare type WithResult<T, R> = T & {
    result: R;
};
export declare type MacroTools = ReturnType<typeof createToolchain>;
export declare type WithTools<T, K extends keyof MacroTools> = T & Pick<MacroTools, K>;
export declare type MacroInsights = Record<string, AddressInsight>;
export declare type LetterAddress = "A" | "B" | "C" | "D" | "E" | "F" | "H" | "I" | "J" | "K" | "L" | "N" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z";
