import { IToken } from "chevrotain";
import mitt, { type Emitter } from "mitt";

import { LexingError } from "../errors/lexer";
import { ParsingError } from "../errors/parser";
import {
  InvalidProgramNumber,
  NoActiveProgram,
  ProgramNumberNotFound
} from "../errors/runtime";
import { InsightCollection } from "../lib/Insights";
import { ProgramNumber } from "../lib/ProgramNumber";
import { FanucMacroB } from "./FanucMacroB";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";
import { MacroRuntimeFSM } from "./MacroRuntimeState";

import type {
  ErrorProducer,
  InterpretedProgram,
  MacroCombinedError,
  MacroRuntimeInitOptions,
  ParsedLineData,
  ProgramLoadOptions,
  RuntimeEvents
} from "../types";
import type { CST } from "../types/CST";

export * from "./MacroRuntimeState";

/*
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime implements ErrorProducer<MacroCombinedError> {
  #fmb: FanucMacroB;
  #state: MacroRuntimeFSM;
  #events: Emitter<RuntimeEvents>;

  #programs: Record<number, string> = {};
  #activeProgram: number | null = null;

  constructor(opts?: Partial<MacroRuntimeInitOptions>) {
    // debug("initializing");
    this.#fmb = new FanucMacroB();
    this.#state = new MacroRuntimeFSM();
    this.#events = mitt<RuntimeEvents>();
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

  get activeProgram() {
    return this.#activeProgram;
  }

  get hasErrors() {
    return this.Lexer.hasErrors || this.Parser.hasErrors;
  }

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
   * Returns the loaded programs indexed by their program numbers.
   */
  getPrograms() {
    return this.#programs;
  }

  /**
   * Count of loaded programs.
   */
  getProgramCount(): number {
    return Object.keys(this.#programs).length;
  }

  /**
   * Return the currently active program.
   */
  getActiveProgram(): string {
    const prgNum = this.getActiveProgramNumber();
    this.#throwIfProgramNotLoaded(prgNum);
    return this.getProgram(this.#activeProgram as number);
  }

  /**
   * Get the currently active program number from the runtime.
   *
   * Returns the program number if exists, otherwise NaN to indicate error
   */
  getActiveProgramNumber(): number {
    if (typeof this.#activeProgram !== "number") {
      throw new NoActiveProgram();
    }
    return this.#activeProgram;
  }

  /**
   * Main entry point to the runtime.
   */
  run(opts?: Partial<{ dryrun: boolean }>): InterpretedProgram {
    this.#tokenizeActiveProgram();

    const programCst = this.Parser.Program() as unknown as CST.ProgramCstNode;

    if (this.Parser.errors.length > 0) {
      this.#error(this.Parser.errors[0]);
    }

    const result = this.Interpreter.Program(programCst.children);

    return result;
  }

  /**
   * Load a Program into memory
   *
   * This method can create a program if given a string
   */
  loadProgram(input: string, options?: ProgramLoadOptions): void {
    const prgNum = new ProgramNumber({
      onFail: err => this.#error(err),
      onMatch: programNumber => {
        this.#programs[programNumber] = input;

        if (options?.setActive) {
          this.setActiveProgram(programNumber);
          // this.#tokenizeActiveProgram();
        }
      }
    });
    prgNum.match(input);
  }

  /**
   * Batch load programs into memory
   */
  loadPrograms(programs: string[]): void {
    programs.forEach(program => this.loadProgram(program));
  }

  /**
   * Check if a program has been loaded and exists in the runtime.
   */
  programIsLoaded(programNumber: number | null): boolean {
    if (typeof programNumber !== "number") return false;
    return !!this.#programs[programNumber];
  }

  /**
   * Set a program number as `active` in the runtime.
   *
   * @TODO add error handling to check if program is loaded
   */
  setActiveProgram(programNumber: number): boolean {
    // debug(`Setting program #${programNumber} active`);
    this.#throwIfProgramNotLoaded(programNumber);
    this.#activeProgram = programNumber;
    return true;
  }

  /**
   * Register a function to handle errors that occur in the runtime.
   */
  onError(handler: (eventData: MacroCombinedError) => void) {
    return this.#events.on("error", handler);
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
   * Return a program by number if loaded in memory.
   */
  getProgram(programNumber: number | string): string {
    if (typeof programNumber === "number") {
      this.#throwIfProgramNotLoaded(programNumber);
      return this.#programs[programNumber];
    }

    if (!programNumber.startsWith("O")) {
      throw new InvalidProgramNumber(programNumber);
    }

    const parsedProgramNumber = Number(programNumber.replace(/^O/, "")); // @TODO this will need to handle ":" eventually
    this.#throwIfProgramNotLoaded(parsedProgramNumber);
    return this.#programs[parsedProgramNumber];
  }

  /**
   * Reset the runtime.
   */
  reset(): void {
    this.#programs = {};
    this.#activeProgram = NaN;
    this.Parser.reset();
    this.Interpreter.getMemory().clearAll();
  }

  /**
   * Load the {@link MacroParser} with tokens from the active program
   */
  #error<T extends Error>(err: T | string) {
    const error = typeof err === "string" ? new Error(err) : err;
    this.#events.emit("error", error);
  }

  /**
   * Load the {@link MacroParser} with tokens from the active program
   */
  #tokenizeActiveProgram(): boolean {
    const input = this.getActiveProgram();
    return this.#lexAndLoadParser(input);
  }

  /**
   * Generate an array of {@link IToken} from an input string
   *
   * @TODO use the below...v
   *
   * @deprecated this same method is on FanucMacroB right?
   */
  #lexAndLoadParser(input: string): boolean {
    this.Lexer.tokenize(input);
    if (this.Lexer.hasErrors) return false;
    const tokens = this.Lexer.getTokens();
    this.Parser.setInput(tokens);
    return true;
  }

  /**
   * Check if a program has been loaded and exists in the runtime.
   */
  #throwIfProgramNotLoaded(num: number | null) {
    if (!this.programIsLoaded(num)) {
      throw new ProgramNumberNotFound(num);
    }
  }
}
