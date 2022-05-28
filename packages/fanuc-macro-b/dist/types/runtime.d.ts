import { ILexingError, IRecognitionException } from "chevrotain";
import type { MacroInterpreter } from "../lib";
export interface ProgramLoadOptions {
    setActive: boolean;
}
export declare type RuntimeErrors = string | ILexingError | IRecognitionException;
export interface RuntimeOutput {
    beginExec: Date;
    result: ReturnType<MacroInterpreter["program"]>;
}
export interface RuntimeEvents {
    close: undefined;
    error: RuntimeErrors;
}
