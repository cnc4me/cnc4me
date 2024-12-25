import Emittery from "emittery";

import { LexingError } from "../errors/lexer";
import { ParsingError } from "../errors/parser";
import { InvalidProgramNumber, ProgramNumberNotFound } from "../errors/runtime";
import { MacroRuntimeFSM } from "../fsm/MacroRuntimeFSM";
import { InsightCollection } from "../lib/Insights";
import { ProgramNumber } from "../lib/ProgramNumber";
import { SystemVariable } from "../memory";
import { Debuggers } from "../utils/debug";
import { FanucMacroB } from "./FanucMacroB";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";

import type { CncMachine } from "../fsm/CncMachine";
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

/**
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime implements ErrorProducer<MacroCombinedError> {
  static EVENTS: _CncMachineEvents & _InterpreterEvents & { ERROR: Error };

  #fmb: FanucMacroB;
  // @TODO: manage the runtime state
  // @ts-expect-error WORKING ON IT
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
      // this.Interpreter.on("LINE", line => {
      //   this.#machine.queueLine(line);
      // });
      this.#machine.onAny((event, data) => {
        void this.#events.emit(`MACHINE:${event}`, data);
      });
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

  get Machine(): CncMachine {
    return this.#machine;
  }

  get hasErrors() {
    return this.#fmb.hasErrors;
  }

  on = this.#events.on.bind(this.#events);

  /**
   * Reset the runtime
   */
  reset(): void {
    this.#debug("resetting");
    this.#programs = {};
    this.#fmb.reset();
  }

  getErrors() {
    return this.#fmb.getErrors();
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
  run(lineCallback?: (line: IParsedLineData) => void): NcProgram | undefined {
    this.#debug("starting run");
    this.#tokenizeActiveProgram();
    this.#debug("lexing complete");
    const programCst = this.Parser.Program() as unknown as CST.ProgramCstNode;
    this.#debug("parsing complete");
    if (this.Parser.hasErrors) {
      this.#error(this.Parser.errors[0]);
      return;
    }
    const result = this.Interpreter.Program(programCst.children);
    for (const line of result.getLines()) {
      if (this.#machine) {
        this.#machine.queueLine(line);
      }
      if (typeof lineCallback === "function") {
        lineCallback(line);
      }
    }
    return result;
  }

  /**
   * Load a Program into memory
   *
   * This method can create a program if given a string
   *
   * @TODO wrap "programs" if they don't have a program number
   */
  loadProgram(input: string, options?: ProgramLoadOptions): void {
    if (options?.programNumber) {
      this.#programs[options.programNumber] = input;
    }

    const matcher = ProgramNumber.create({
      onFail: err => this.#error(err),
      onMatch: programNumber => {
        this.#programs[programNumber] = input;

        if (options?.setActive) {
          this.setActiveProgram(programNumber);
          // this.#tokenizeActiveProgram();
        }
      }
    });

    matcher.match(input);
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
   * Return the active program content.
   */
  getActiveProgram(): string {
    const num = this.getActiveProgramNumber();
    this.#throwIfProgramNotLoaded(num);
    return this.getProgram(this.getActiveProgramNumber());
  }

  /**
   * Return the active program nmber.
   */
  getActiveProgramNumber() {
    return this.Memory.read(SystemVariable._MAINO);
  }

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
   * Load the {@link MacroParser} with tokens from the active program
   */
  #error<T extends Error>(err: T | string) {
    const error = typeof err === "string" ? new Error(err) : err;
    void this.#events.emit("ERROR", error);
  }

  /**
   * Load the {@link MacroParser} with tokens from the active program
   */
  #tokenizeActiveProgram() {
    const input = this.getActiveProgram();
    return this.#fmb.tokenizeAndLoadParser(input);
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

type _CncMachineEvents = PrefixObjectKeys<"MACHINE", typeof CncMachine.EVENTS>;
type _InterpreterEvents = PrefixObjectKeys<
  "INTERPRETER",
  typeof MacroInterpreter.EVENTS
>;
