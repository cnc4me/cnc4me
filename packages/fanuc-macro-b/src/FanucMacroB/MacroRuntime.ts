import { IToken } from "chevrotain";
import Emittery from "emittery";

import { LexingError } from "../errors/lexer";
import { ParsingError } from "../errors/parser";
import { InvalidProgramNumber, ProgramNumberNotFound } from "../errors/runtime";
import { InsightCollection } from "../lib/Insights";
import { ProgramNumber } from "../lib/ProgramNumber";
import { FanucMacroB } from "./FanucMacroB";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";

import type {
  ErrorProducer,
  InterpretedProgram,
  MacroCombinedError,
  MacroRuntimeInitOptions,
  ParsedLineData,
  ProgramLoadOptions,
  RuntimeEvents,
  RuntimeOutput
} from "../types";
import type { CST } from "../types/CST";

export * from "./MacroRuntimeState";

/*
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime implements ErrorProducer<MacroCombinedError> {
  #fmb: FanucMacroB;

  private _events = new Emittery<RuntimeEvents>();
  private _programs: Record<number, string> = {};
  private _activeProgram: number | null = null;

  constructor(opts?: Partial<MacroRuntimeInitOptions>) {
    // debug("initializing");
    this.#fmb = new FanucMacroB();
  }

  get Lexer(): MacroLexer {
    return this.#fmb.lexer;
  }

  get Parser(): MacroParser {
    return this.#fmb.parser;
  }

  get Interpreter(): MacroInterpreter {
    return this.#fmb.interpreter;
  }

  get Memory(): MacroMemory {
    return this.#fmb.memory;
  }

  get hasErrors() {
    return this.Lexer.hasErrors || this.Parser.hasErrors;
  }

  /**
   * Retrieve Parser and Lexer errors
   * @deprecated use the getErrors method on FanucMacroB when implemented in the class
   */
  getErrors() {
    return [
      ...this.Parser.getErrors(), //
      ...this.Lexer.getErrors()
    ];
  }

  getInsights(): InsightCollection {
    return this.Interpreter.getInsights();
  }

  /**
   * Reset the runtime.
   */
  reset(): void {
    this._programs = {};
    this._activeProgram = NaN;
    this.Parser.reset();
    this.Interpreter.getMemory().clearAll();
  }

  /**
   * Main entry point to the runtime.
   */
  run(): RuntimeOutput {
    const beginExec = new Date();

    this._tokenizeActiveProgram();

    const programCst = this.Parser.Program() as unknown as CST.ProgramCstNode;

    /**
     * @TODO ERROR HANDLING!!!!
     */
    if (this.Parser.errors.length > 0) {
      // void this._events.emit("error", this.Parser.errors);
    }

    const result = this.Interpreter.Program(programCst.children);

    return {
      beginExec,
      result
    } as RuntimeOutput;
  }

  /**
   * Register a function to handle errors that occur in the runtime.
   */
  onError(handler: (eventData: MacroCombinedError) => void) {
    return this._events.on("error", handler);
  }

  /**
   * Retrieve a record of errors
   */
  getErrorMessages(): string[] {
    return this.getErrors().map(err => {
      if (err instanceof LexingError || err instanceof ParsingError) {
        return err.message;
      }
      return err;
    });
  }

  /**
   * Run the {@link MacroParser} on the active program.
   */
  evalProgram(code: string): InterpretedProgram {
    this._lexAndLoadParser(code);
    // this._tokenizeActiveProgram();

    const programCst = this.Parser.Program() as unknown as CST.ProgramCstNode;

    return this.Interpreter.Program(programCst.children);
  }

  /**
   * Analyze a text in the context of being a valid NC program
   * @TODO this can fail and cst.children is undefined
   * @deprecated
   */
  evalLines(code: string): ParsedLineData[] {
    this._lexAndLoadParser(code);

    const cst = this.Parser.Lines();

    return this.Interpreter.Lines(cst.children);
  }

  /**
   * why?
   */
  // readMemoryRegister(num: number) {
  //   return this._mem.read(num);
  // }

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
   * Load a Program into memory
   *
   * This method can create a program if given a string
   */
  loadProgram(input: string, options?: ProgramLoadOptions): void {
    ProgramNumber.match(input, {
      NOMATCH: err => {
        const error = new Error(err);
        this._emitError(error);
      },
      MATCH: result => {
        const programNumber = Number(result[1]);

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

    const parsedProgramNumber = Number(programNumber.replace(/^O/, "")); // @TODO this will need to handle ":" eventually
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
  private _emitError(error: MacroCombinedError): false {
    void this._events.emit("error", error);
    return false;
  }

  /**
   * Load the {@link MacroParser} with tokens from the active program
   */
  private _tokenizeActiveProgram(): boolean {
    const input = this.getActiveProgram();
    return this._lexAndLoadParser(input);
  }

  /**
   * Generate an array of {@link IToken} from an input string
   *
   * @TODO use the below...v
   *
   * @deprecated this same method is on FanucMacroB right?
   */
  private _lexAndLoadParser(input: string): boolean {
    this.Lexer.tokenize(input);
    if (this.Lexer.hasErrors) return false;
    const tokens = this.Lexer.getTokens();
    this.Parser.setInput(tokens);
    return true;
  }
}
