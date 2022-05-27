import Emittery from "emittery";
import { matchProgramNumber } from "../utils";
import { MacroEnv } from "./MacroEnv";
/*
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime {
    _env;
    _activeProgram = NaN;
    _lexerErrors = [];
    _programs = {};
    _events = new Emittery();
    get Lexer() {
        return this._env.Lexer;
    }
    get LexerErrors() {
        return this._lexerErrors;
    }
    get Parser() {
        return this._env.Parser;
    }
    get ParserErrors() {
        return this._env.Parser.errors;
    }
    get Interpreter() {
        return this._env.Interpreter;
    }
    get Memory() {
        return this._env.Memory;
    }
    get Insights() {
        return this._env.Interpreter.Insights;
    }
    constructor() {
        // debug("initializing");
        this._env = new MacroEnv();
    }
    /**
     * Main entry point to the runtime.
     */
    run() {
        const beginExec = new Date();
        this._tokenizeActiveProgram();
        const programCst = this.Parser.program();
        /**
         * @TODO ERROR HANDLING!!!!
         */
        if (this.Parser.errors.length > 0) {
            // void this._events.emit("error", this.Parser.errors);
        }
        const result = this.Interpreter.program(programCst.children);
        return {
            beginExec,
            result
        };
    }
    /**
     * Reset the runtime.
     */
    reset() {
        this.Memory.reset();
        this.Parser.input = [];
        this._env.Parser.errors = [];
        this._activeProgram = NaN;
    }
    /**
     * Retrieve a record of errors
     */
    getErrors() {
        const errors = [...this.ParserErrors, ...this.LexerErrors];
        this._env.Parser.errors = [];
        return errors;
    }
    /**
     * Register a function to handle errors that occur in the runtime.
     */
    onError(handler) {
        return this._events.on("error", handler);
    }
    /**
     * Sugar method for tokenizing and setting the parser in one step
     */
    loadParser(input) {
        const { errors, tokens } = this.Lexer.tokenize(input);
        if (errors.length > 0) {
            return {
                input,
                errors,
                tokens: []
            };
        }
        this.Parser.input = tokens;
        return {
            input,
            tokens,
            errors: []
        };
    }
    /**
     * Run the {@link MacroParser} on the active program.
     */
    evalProgram(code) {
        this._tokenizeForParsing(code);
        // this._tokenizeActiveProgram();
        const programCst = this.Parser.program();
        return this.Interpreter.program(programCst.children);
    }
    /**
     * Analyze a text in the context of being a valid NC program
     */
    evalLines(code) {
        this._tokenizeForParsing(code);
        const cst = this.Parser.lines();
        return this.Interpreter.lines(cst.children);
    }
    /**
     * Return a program by number if loaded in memory.
     */
    getProgram(programNumber) {
        if (typeof programNumber === "string") {
            if (programNumber.startsWith("O")) {
                const num = programNumber.replace(/^O/, "");
                return this._programs[parseInt(num)];
            }
            else {
                return this._programs[parseInt(programNumber)];
            }
        }
        else {
            return this._programs[programNumber];
        }
    }
    /**
     * Returns the loaded programs indexed by their program numbers.
     */
    getPrograms() {
        return this._programs;
    }
    /**
     * Count of loaded programs.
     */
    getProgramCount() {
        return Object.keys(this._programs).length;
    }
    /**
     * Return the currently active program.
     */
    getActiveProgram() {
        if (typeof this._activeProgram === "number") {
            return this.getProgram(this._activeProgram);
        }
        else {
            return "No active program selected.";
        }
    }
    /**
     * Get the currently active program number from the runtime.
     */
    getActiveProgramNumber() {
        return this._activeProgram;
    }
    /**
     * Set a program number as `active` in the runtime.
     */
    setActiveProgram(programNumber) {
        // debug(`Setting program #${programNumber} active`);
        this._activeProgram = programNumber;
    }
    /**
     * Load a AnalyzedProgram into memory
     *
     * This method can create a program if given a string
     */
    loadProgram(input, options) {
        matchProgramNumber(input, {
            NOMATCH: error => this._emitError(error),
            MATCH: result => {
                const programNumber = parseInt(result[1]);
                this._programs[programNumber] = input;
                if (options?.setActive) {
                    this.setActiveProgram(programNumber);
                    this._tokenizeActiveProgram();
                }
                return this._programs[programNumber];
            }
        });
    }
    /**
     * Batch load programs into memory
     */
    loadPrograms(programs) {
        programs.forEach(program => this.loadProgram(program));
    }
    /**
     * Helper to emit errors
     */
    _emitError(error) {
        void this._events.emit("error", error);
        return false;
    }
    /**
     * Load the {@link MacroParser} with tokens from the active program
     */
    _tokenizeActiveProgram() {
        const input = this.getActiveProgram();
        this._tokenizeForParsing(input);
    }
    /**
     * Generate an array of {@link IToken} from an input string
     */
    _tokenizeForParsing(input) {
        const { errors, tokens } = this.Lexer.tokenize(input);
        /**
         * @TODO error handling needs to be addressed
         */
        if (errors.length > 0) {
            this._lexerErrors.push(...errors);
            // void this._events.emit("error", this._lexerErrors);
        }
        this.Parser.input = tokens;
    }
    /**
     * Parse a program number from a string or number.
     */
    _parseProgramNumber(programNumber) {
        if (typeof programNumber === "string") {
            if (programNumber.startsWith("O")) {
                const num = programNumber.replace(/^O/, "");
                return parseInt(num);
            }
            else {
                return parseInt(programNumber);
            }
        }
        else {
            return programNumber;
        }
    }
}
