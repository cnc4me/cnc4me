import { ILexingError } from "chevrotain";
import { MacroInterpreter, MacroLexer, MacroParser } from "../lib";
import { MacroToolchainOptions } from "../types";
export declare function createToolchain(options?: MacroToolchainOptions): {
    errors: ILexingError[];
    lexer: MacroLexer;
    parser: MacroParser;
    interpreter: MacroInterpreter;
};
