import { ILexingError, IRecognitionException, IToken } from "chevrotain";
import Emittery from "emittery";

import type {
  InterpretedProgram,
  LexingErrors,
  ParsedLineData,
  ProgramLoadOptions,
  RuntimeErrors,
  RuntimeEvents,
  RuntimeOutput
} from "../types";
import { ProgramCstNode } from "../types/fanuc";
import { matchProgramNumber } from "../utils";
import { runtime as debug } from "./debuggers";
import { InsightCollection } from "./Insights";
import { MacroEnv } from "./MacroEnv";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";

/*
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime {
  private _env: MacroEnv;
  private _activeProgram = NaN;
  private _lexerErrors: ILexingError[] = [];
  private _programs: Record<number, string> = {};
  private _events = new Emittery<RuntimeEvents>();

  get Lexer(): MacroLexer {
    return this._env.Lexer;
  }

  get LexerErrors(): ILexingError[] {
    return this._lexerErrors;
  }

  get Parser(): MacroParser {
    return this._env.Parser;
  }

  get ParserErrors(): IRecognitionException[] {
    return this._env.Parser.errors;
  }

  get Interpreter(): MacroInterpreter {
    return this._env.Interpreter;
  }

  get Memory(): MacroMemory {
    return this._env.Memory;
  }

  get Insights(): InsightCollection {
    return this._env.Interpreter.Insights;
  }

  constructor() {
    debug("initializing");

    this._env = new MacroEnv();
  }

  /**
   * Main entry point to the runtime.
   */
  run(): RuntimeOutput {
    const beginExec = new Date();

    this._tokenizeActiveProgram();

    const programCst = this.Parser.program() as ProgramCstNode;

    if (this.Parser.errors.length > 0) {
      void this._events.emit("error", this.Parser.errors);
    }

    const result = this.Interpreter.program(programCst.children);

    return { beginExec, result } as RuntimeOutput;
  }

  /**
   * Reset the runtime.
   */
  reset(): void {
    this.Memory.reset();
    this.Parser.input = [];
    this._activeProgram = NaN;
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
   * Sugar method for tokenizing and setting the parser in one step
   */
  loadParser(input: string):
    | {
        input: string;
        errors: LexingErrors;
        tokens: IToken[];
      }
    | {
        input: string;
        errors: false;
        tokens: never[];
      } {
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
  evalProgram(code: string): InterpretedProgram {
    this._tokenizeForParsing(code);
    // this._tokenizeActiveProgram();

    const programCst = this.Parser.program() as ProgramCstNode;

    return this.Interpreter.program(programCst.children);
  }

  /**
   * Analyze a text in the context of being a valid NC program
   */
  evalLines(code: string): ParsedLineData[] {
    this._tokenizeForParsing(code);

    const cst = this.Parser.lines();

    return this.Interpreter.lines(cst.children);
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
    debug(`Setting program #${programNumber} active`);
    this._activeProgram = programNumber;
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
    const { errors, tokens } = this.Lexer.tokenize(input);

    if (errors.length > 0) {
      this._lexerErrors.push(...errors);
      void this._events.emit("error", this._lexerErrors);
    }

    this.Parser.input = tokens;
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
