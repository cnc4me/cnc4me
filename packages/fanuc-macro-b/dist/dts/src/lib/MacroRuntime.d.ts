import { ILexingError, IRecognitionException, IToken } from "chevrotain";
import Emittery from "emittery";
import type { InterpretedProgram, ParsedLineData, ProgramLoadOptions } from "../types";
import type { RuntimeErrors, RuntimeOutput } from "../types/runtime";
import { InsightCollection } from "./Insights";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";
export declare class MacroRuntime {
    private _env;
    private _activeProgram;
    private _lexerErrors;
    private _programs;
    private _events;
    get Lexer(): MacroLexer;
    get LexerErrors(): ILexingError[];
    get Parser(): MacroParser;
    get ParserErrors(): IRecognitionException[];
    get Interpreter(): MacroInterpreter;
    get Memory(): MacroMemory;
    get Insights(): InsightCollection;
    constructor();
    /**
     * Main entry point to the runtime.
     */
    run(): RuntimeOutput;
    /**
     * Reset the runtime.
     */
    reset(): void;
    /**
     * Retrieve a record of errors
     */
    getErrors(): RuntimeErrors[];
    /**
     * Register a function to handle errors that occur in the runtime.
     */
    onError(handler: (eventData: RuntimeErrors) => void): Emittery.UnsubscribeFn;
    /**
     * Sugar method for tokenizing and setting the parser in one step
     */
    loadParser(input: string): {
        input: string;
        errors: ILexingError[];
        tokens: IToken[];
    } | {
        input: string;
        errors: false;
        tokens: never[];
    };
    /**
     * Run the {@link MacroParser} on the active program.
     */
    evalProgram(code: string): InterpretedProgram;
    /**
     * Analyze a text in the context of being a valid NC program
     */
    evalLines(code: string): ParsedLineData[];
    /**
     * Return a program by number if loaded in memory.
     */
    getProgram(programNumber: number | string): string;
    /**
     * Returns the loaded programs indexed by their program numbers.
     */
    getPrograms(): Record<number, string>;
    /**
     * Count of loaded programs.
     */
    getProgramCount(): number;
    /**
     * Return the currently active program.
     */
    getActiveProgram(): string;
    /**
     * Get the currently active program number from the runtime.
     */
    getActiveProgramNumber(): number;
    /**
     * Set a program number as `active` in the runtime.
     */
    setActiveProgram(programNumber: number): void;
    /**
     * Load a AnalyzedProgram into memory
     *
     * This method can create a program if given a string
     */
    loadProgram(input: string, options?: ProgramLoadOptions): void;
    /**
     * Batch load programs into memory
     */
    loadPrograms(programs: string[]): void;
    /**
     * Helper to emit errors
     */
    private _emitError;
    /**
     * Load the {@link MacroParser} with tokens from the active program
     */
    private _tokenizeActiveProgram;
    /**
     * Generate an array of {@link IToken} from an input string
     */
    private _tokenizeForParsing;
    /**
     * Parse a program number from a string or number.
     */
    private _parseProgramNumber;
}
