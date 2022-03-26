import { ILexingError, IRecognitionException } from "chevrotain";
import Debug from "debug";
import Emittery from "emittery";

import type {
  InterpretedLines,
  InterpretedProgram,
  ProgramLoadOptions,
  RuntimeErrors,
  RuntimeEvents,
  RuntimeOutput
} from "../types";
import { createToolchain, matchProgramNumber } from "../utils";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroParser } from "./MacroParser";

function range(x: number, y: number): number[] {
  return x > y ? [] : [x, ...range(x + 1, y)];
}

/*
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime {
  private _debug = Debug("macro:runtime");
  private _events = new Emittery<RuntimeEvents>();

  private _lexer: MacroLexer;
  private _lexerErrors: ILexingError[] = [];
  private _parser: MacroParser;
  private _interpreter: MacroInterpreter;

  private _activeProgram = NaN;
  private _vars = new Map<number, number>();
  private _programs: Record<number, string> = {};

  get Lexer(): MacroLexer {
    return this._lexer;
  }

  get LexerErrors(): ILexingError[] {
    return this._lexerErrors;
  }

  get Parser(): MacroParser {
    return this._parser;
  }

  get ParserErrors(): IRecognitionException[] {
    return this._parser.errors;
  }

  get ParserHasTokens(): boolean {
    return this._parser.input.length > 0;
  }

  get Interpreter(): MacroInterpreter {
    return this._interpreter;
  }

  constructor() {
    const { parser, lexer, interpreter } = createToolchain();

    this._lexer = lexer;
    this._parser = parser;
    this._interpreter = interpreter;

    this._initializeMacroRegisters();
  }

  /**
   * Main entry point to the runtime.
   */
  run(): RuntimeOutput {
    const beginExec = new Date();

    this._tokenizeActiveProgram();

    const cst = this._parser.program();

    if (this._parser.errors.length > 0) {
      void this._events.emit("error", this._parser.errors);
    }

    const result = this._interpreter.visit(cst) as InterpretedProgram;

    return { beginExec, result } as RuntimeOutput;
  }

  /**
   * Reset the runtime.
   */
  reset(): void {
    this._parser.input = [];
    this._activeProgram = NaN;
    this._initializeMacroRegisters();
  }

  /**
   * Retrieve a record of errors
   */
  getErrors() {
    return {
      parseErrors: this.ParserErrors,
      lexingErrors: this.LexerErrors
    };
  }

  /**
   * Register a function to handle errors that occur in the runtime.
   */
  onError(handler: (eventData: RuntimeErrors) => void): void {
    this._events.on("error", handler);
  }

  /**
   * Run the {@link MacroParser} on the active program.
   */
  evalProgram(code: string): InterpretedProgram {
    this._tokenizeForParsing(code);
    // this._tokenizeActiveProgram();

    const cst = this._parser.program();

    return this._interpreter.visit(cst) as InterpretedProgram;
  }

  /**
   * Analyze a text in the context of being a valid NC program
   */
  evalLines(code: string): InterpretedLines {
    this._tokenizeForParsing(code);

    const cst = this._parser.lines();

    return this._interpreter.lines(cst.children);
  }

  /**
   * Return a program by number if loaded in memory.
   */
  getProgram(programNumber: number | string): string {
    if (typeof programNumber === "string") {
      if (programNumber.startsWith("O")) {
        const num = programNumber.replace(/^O/, "");
        return this._programs[parseInt(num)];
      } else {
        return this._programs[parseInt(programNumber)];
      }
    } else {
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
  getProgramCount(): number {
    return Object.keys(this._programs).length;
  }

  /**
   * Return the currently active program.
   */
  getActiveProgram(): string {
    if (typeof this._activeProgram === "number") {
      return this.getProgram(this._activeProgram);
    } else {
      return "No active program selected.";
    }
  }

  /**
   * Get the currently active program number from the runtime.
   */
  getActiveProgramNumber(): number {
    return this._activeProgram;
  }

  /**
   * Set a program number as `active` in the runtime.
   */
  setActiveProgram(programNumber: number): void {
    this._debug(`Setting program #${programNumber} active`);
    this._activeProgram = programNumber;
  }

  /**
   * Read the value of a macro variable register
   */
  readVar(key: number): number {
    return this._vars.get(key) as number;
  }

  /**
   * Write a value to a macro variable register
   */
  writeVar(key: number, value: number): this {
    this._vars.set(key, value);
    return this;
  }

  /**
   * Clear a macro variable register
   */
  initVar(key: number): this {
    this.writeVar(key, NaN);
    return this;
  }

  /**
   * Check if a variable has been set
   */
  varIsset(key: number): boolean {
    if (this._vars.has(key)) {
      const value = this._vars.get(key) as number;
      return isNaN(value) === false;
    }
    return false;
  }

  /**
   * Load a AnalyzedProgram into memory
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
   * Batch load programs into memory
   */
  loadPrograms(programs: string[]): void {
    programs.forEach(program => this.loadProgram(program));
  }

  /**
   * Helper to emit errors
   */
  private _emitError(err: RuntimeErrors): false {
    void this._events.emit("error", err);
    return false;
  }

  /**
   * Initialize macro variable registers to `NaN`
   */
  private _initializeMacroRegisters() {
    // eslint-disable-next-line prettier/prettier
    const registers: number[] = [
      ...range(1, 33),
      ...range(100, 299),
      ...range(500, 699)
    ];

    this._debug(`Initializing registers (${registers.length})`);

    registers.forEach(i => this.initVar(i));
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

    if (errors.length > 0) {
      this._lexerErrors.push(...errors);
      void this._events.emit("error", this._lexerErrors);
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

  //   const cst = this._parser[rule]();

  //   return this._interpreter.visit(cst) as T;
  // }
}
