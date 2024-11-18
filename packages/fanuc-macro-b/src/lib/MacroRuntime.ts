import { ILexingError, IToken } from "chevrotain";
import Emittery from "emittery";

import { isLexingError, isParsingError, matchProgramNumber } from "../utils";
import { InvalidProgramNumber, ProgramNumberNotFound } from "./errors";
import { InsightCollection } from "./Insights";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer2 } from "./MacroLexer2";
import { MacroParser } from "./MacroParser";
import { MacroMemory } from "./memory";

import type {
  InterpretedProgram,
  ParsedLineData,
  ProgramCstNode,
  ProgramLoadOptions,
  RuntimeError,
  RuntimeEvents,
  RuntimeOutput
} from "../types";

/*
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime {
  private _mem: MacroMemory;
  private _lexer: MacroLexer2;
  private _parser: MacroParser;
  private _interpreter: MacroInterpreter;

  private _events = new Emittery<RuntimeEvents>();
  private _programs: Record<number, string> = {};
  private _activeProgram: number | null = null;

  constructor() {
    // debug("initializing");
    this._events = new Emittery<RuntimeEvents>();
    this._mem = new MacroMemory();
    this._lexer = new MacroLexer2();
    this._parser = new MacroParser();
    this._interpreter = new MacroInterpreter({ memory: this._mem });
  }

  get Memory(): MacroMemory {
    return this._mem;
  }

  get Lexer(): MacroLexer2 {
    return this._lexer;
  }

  get Parser(): MacroParser {
    return this._parser;
  }

  get Interpreter(): MacroInterpreter {
    return this._interpreter;
  }

  get Insights(): InsightCollection {
    return this._interpreter.Insights;
  }

  /**
   * Reset the runtime.
   */
  reset(): void {
    this._programs = {};
    this._activeProgram = NaN;
    this._mem.reset();
    this._parser.reset();
  }

  /**
   * Main entry point to the runtime.
   */
  run(): RuntimeOutput {
    const beginExec = new Date();

    this._tokenizeActiveProgram();

    const programCst = this._parser.program() as unknown as ProgramCstNode;

    /**
     * @TODO ERROR HANDLING!!!!
     */
    if (this._parser.errors.length > 0) {
      // void this._events.emit("error", this.Parser.errors);
    }

    const result = this._interpreter.program(programCst.children);

    return {
      beginExec,
      result
    } as RuntimeOutput;
  }

  /**
   * Register a function to handle errors that occur in the runtime.
   */
  onError(handler: (eventData: RuntimeError) => void) {
    return this._events.on("error", handler);
  }

  /**
   * Retrieve a record of errors
   */
  getErrors(): string[] {
    const errors = [...this._parser.errors, ...this._lexer.errors];

    // this._env.Parser.errors = [];

    return errors.map(err => {
      if (isLexingError(err) || isParsingError(err)) {
        return err.message;
      }
      return err;
    });
  }

  /**
   * Run the {@link MacroParser} on the active program.
   */
  evalProgram(code: string): InterpretedProgram {
    this._tokenizeForParsing(code);
    // this._tokenizeActiveProgram();

    const programCst = this._parser.program() as unknown as ProgramCstNode;

    return this._interpreter.program(programCst.children);
  }

  /**
   * Analyze a text in the context of being a valid NC program
   */
  evalLines(code: string): ParsedLineData[] {
    this._tokenizeForParsing(code);

    const cst = this._parser.lines();

    return this._interpreter.lines(cst.children);
  }

  /**
   * Check if a program has been loaded and exists in the runtime.
   */
  programIsLoaded(programNumber: MacroRuntime["_activeProgram"]): boolean {
    if (programNumber === null) return false;
    return !!this._programs[programNumber];
  }

  /**
   * Set a program number as `active` in the runtime.
   *
   * @TODO add error handling to check if program is loaded
   */
  setActiveProgram(programNumber: number): boolean {
    // debug(`Setting program #${programNumber} active`);
    this._throwIfProgramNotLoaded(programNumber);
    this._activeProgram = programNumber;
    return true;
  }

  /**
   * Load the parser's input
   *
   * @TODO this should take string, not tokens.
   * @deprecated use loadParserTokens
   */
  setParserInput(tokens: IToken[]) {
    this._parser.input = tokens;
  }

  /**
   * Load the parser's input with tokens.
   */
  loadParserTokens(tokens: IToken[]) {
    this._parser.input = tokens;
  }

  /**
   * Return a program by number if loaded in memory.
   */
  getProgram(programNumber: number | string): string {
    if (typeof programNumber === "number") {
      this._throwIfProgramNotLoaded(programNumber);
      return this._programs[programNumber];
    }

    if (!programNumber.startsWith("O")) {
      throw new InvalidProgramNumber(programNumber);
    }

    const parsedProgramNumber = Number(programNumber.replace(/^O/, ""));
    this._throwIfProgramNotLoaded(parsedProgramNumber);
    return this._programs[parsedProgramNumber];
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
  getProgramCount(): number {
    return Object.keys(this._programs).length;
  }

  /**
   * Return the currently active program.
   */
  getActiveProgram(): string {
    if (this._activeProgram === null) {
      this._throwIfProgramNotLoaded(this._activeProgram);
    }
    return this.getProgram(this._activeProgram as number);
  }

  /**
   * Get the currently active program number from the runtime.
   *
   * Returns the program number if exists, otherwise NaN to indicate error
   */
  getActiveProgramNumber(): number {
    if (typeof this._activeProgram === "number") {
      return this._activeProgram;
    } else {
      return NaN;
    }
  }

  /**
   * Load a Program into memory
   *
   * This method can create a program if given a string
   */
  loadProgram(input: string, options?: ProgramLoadOptions): void {
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
   * Load a Program into memory
   *
   * This method can create a program if given a string
   */
  loadProgram2(input: string, options?: ProgramLoadOptions): void {
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
  loadPrograms(programs: string[]): void {
    programs.forEach(program => this.loadProgram(program));
  }

  /**
   * Sugar method for tokenizing and setting the parser in one step
   */
  loadParser(input: string):
    | {
        input: string;
        errors: ILexingError[];
        tokens: IToken[];
      }
    | {
        input: string;
        errors: false;
        tokens: never[];
      } {
    const { errors, tokens } = this._lexer.tokenize(input);

    if (errors.length > 0) {
      return {
        input,
        errors,
        tokens: []
      };
    }

    this._parser.input = tokens;

    return {
      input,
      tokens,
      errors: []
    };
  }

  /**
   * Check if a program has been loaded and exists in the runtime.
   */
  private _throwIfProgramNotLoaded(num: MacroRuntime["_activeProgram"]) {
    if (!this.programIsLoaded(num)) {
      throw new ProgramNumberNotFound(num);
    }
  }

  /**
   * Helper to emit errors
   */
  private _emitError(error: string | RuntimeError): false {
    void this._events.emit("error", error);
    return false;
  }

  /**
   * Load the {@link MacroParser} with tokens from the active program
   */
  private _tokenizeActiveProgram(): void {
    const input = this.getActiveProgram();

    this._tokenizeForParsing(input);
  }

  /**
   * Generate an array of {@link IToken} from an input string
   */
  private _tokenizeForParsing(input: string): void {
    const { errors, tokens } = this._lexer.tokenize(input);

    /**
     * @TODO error handling needs to be addressed
     */
    if (errors.length > 0) {
      this._lexer.errors.push(...errors);
      // void this._events.emit("error", this._lexerErrors);
    }

    this._parser.input = tokens;
  }

  /**
   * Parse a program number from a string or number.
   */
  private _parseProgramNumber(programNumber: number | string): number {
    if (typeof programNumber === "string") {
      if (programNumber.startsWith("O")) {
        const num = programNumber.replace(/^O/, "");
        return parseInt(num);
      } else {
        return parseInt(programNumber);
      }
    } else {
      return programNumber;
    }
  }

  /**
   * Run the parser by named rule
   */
  // private _interpret<T>(code: string, rule: TopLevelParserRules): T {
  //   this._tokenizeForParsing(code);

  //   const cst = this.Parser[rule]();

  //   return this.Interpreter.visit(cst) as T;
  // }
}
