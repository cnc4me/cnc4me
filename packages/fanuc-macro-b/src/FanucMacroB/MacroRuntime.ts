import { IToken } from "chevrotain";
import Emittery from "emittery";

import { LexingError } from "../errors/lexer";
import { ParsingError } from "../errors/parser";
import {
  InvalidProgramNumber,
  NoActiveProgram,
  ProgramNumberNotFound
} from "../errors/runtime";
import { type CncMachine, MacroRuntimeFSM } from "../fsm";
import { InsightCollection } from "../lib/Insights";
import { ProgramNumber } from "../lib/ProgramNumber";
import { SystemVariable } from "../memory";
import { Debuggers } from "../utils";
import { FanucMacroB } from "./FanucMacroB";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";

import type { NcProgram } from "../lib/NcProgram";
import type {
  CST,
  ErrorProducer,
  IParsedLineData,
  MacroCombinedError,
  PrefixObjectKeys,
  ProgramLoadOptions
} from "../types";

export interface MacroRuntimeConfig {
  machine?: CncMachine;
}

type _CncMachineEvents = PrefixObjectKeys<"MACHINE", typeof CncMachine.EVENTS>;
type _InterpreterEvents = PrefixObjectKeys<
  "INTERPRETER",
  typeof MacroInterpreter.EVENTS
>;
type RuntimeEvents = {
  ERROR: Error;
};

/*
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime implements ErrorProducer<MacroCombinedError> {
  static EVENTS: RuntimeEvents & _CncMachineEvents & _InterpreterEvents;

  #fmb: FanucMacroB;
  #state = new MacroRuntimeFSM();
  #events = new Emittery<typeof MacroRuntime.EVENTS>();

  #programs: Record<number, string> = {};

  #machine!: CncMachine;
  #debug = Debuggers.Runtime;

  constructor(config?: Partial<MacroRuntimeConfig>) {
    this.#debug("initializing");
    this.#fmb = new FanucMacroB();

    if (config?.machine) {
      this.#debug("simulating with machine");
      this.#machine = config.machine;
      this.Interpreter.on("LINE", line => {
        this.#machine.processLineData(line);
      });
      this.#machine.onAny((event, data) => {
        void this.#events.emit(`MACHINE:${event}`, data);
      });

      // this.Interpreter.on("LINE", line => {
      //   void this.#machine.pushLine(line);
      // });
    }
    this.Interpreter.onAny((event, data) => {
      void this.#events.emit(`INTERPRETER:${event}`, data);
    });
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

  get mainProgram() {
    return this.Memory.read(SystemVariable._MAINO);
  }

  get hasErrors() {
    return this.Lexer.hasErrors || this.Parser.hasErrors;
  }

  on = this.#events.on.bind(this.#events);

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
   * Main entry point to the runtime.
   */
  run(lineCallback?: (line: IParsedLineData) => void): NcProgram {
    // if (typeof lineCallback === "function") {
    //   this.#debug("lineCallback registered");
    //   this.Interpreter.on("LINE", line => {
    //     lineCallback(line);
    //   });
    // }
    this.#debug("starting run");
    this.#tokenizeActiveProgram();
    this.#debug("lexing complete");
    const programCst = this.Parser.Program() as unknown as CST.ProgramCstNode;
    this.#debug("parsing complete");
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
    ProgramNumber.create({
      onFail: err => this.#error(err),
      onMatch: programNumber => {
        this.#programs[programNumber] = input;

        if (options?.setActive) {
          this.setActiveProgram(programNumber);
          // this.#tokenizeActiveProgram();
        }
      }
    }).match(input);
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
    this.Memory.write(SystemVariable._MAINO, programNumber);
    return true;
  }

  /**
   * Return the currently active program.
   */
  getActiveProgram(): string {
    this.#throwIfProgramNotLoaded(this.mainProgram);
    return this.getProgram(this.mainProgram);
  }

  /**
   * Get the currently active program number from the runtime.
   *
   * Returns the program number if exists, otherwise NaN to indicate error
   */
  // getActiveProgramNumber(): number {
  //   if (typeof this.mainProgram !== "number") {
  //     throw new NoActiveProgram();
  //   }
  //   return this.#activeProgram;
  // }

  /**
   * Register a function to handle errors that occur in the runtime.
   */
  onError(handler: (eventData: MacroCombinedError) => void) {
    return this.#events.on("ERROR", handler);
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
    if (
      typeof programNumber !== "string" &&
      typeof programNumber !== "number"
    ) {
      throw new InvalidProgramNumber(programNumber);
    }

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
    this.Parser.reset();
    this.Memory.clear(SystemVariable._MAINO);
    this.Interpreter.getMemory().clearAll();
  }

  /**
   * Load the {@link MacroParser} with tokens from the active program
   */
  #error<T extends Error>(err: T | string) {
    const error = typeof err === "string" ? new Error(err) : err;
    void this.#events.emit("ERROR", error);
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
