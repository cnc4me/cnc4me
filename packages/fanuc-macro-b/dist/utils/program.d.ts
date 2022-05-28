import { IRecognitionException } from "chevrotain";
import type { InsightCollection } from "../lib";
import type { InterpretedProgram } from "../types";
interface ProgramAnalisys {
    result: InterpretedProgram;
    insights: InsightCollection;
    errors: IRecognitionException[];
}
/**
 * Analyze a text in the context of being a valid NC program
 */
export declare function program(input: string): ProgramAnalisys;
export {};
