import { AnalyzedProgram, ProgramRecords } from "../types";
import { analyze, zeroPad } from "../utils";

function range(x: number, y: number): number[] {
  return x > y ? [] : [x, ...range(x + 1, y)];
}

/**
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime {
  private _activeProgram!: number;
  private _programs: ProgramRecords = {};
  private _vars = new Map<number, number>();

  constructor() {
    // eslint-disable-next-line prettier/prettier
    const registers: number[] = [
      ...range(1, 33),
      ...range(100, 299),
      ...range(500, 699)
    ];

    registers.forEach(i => this.initVar(i));
  }

  /**
   * Main entry point to the runtime
   */
  run(): void {
    //
  }

  getPrograms(): ProgramRecords {
    return this._programs;
  }

  getProgramCount(): number {
    return Object.keys(this._programs).length;
  }

  getActiveProgram(): AnalyzedProgram {
    return this._programs[this._activeProgram];
  }

  getActiveProgramNumber(): string {
    return zeroPad(this._activeProgram);
  }

  setActiveProgram(programNumber: number): void {
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
  loadProgram(input: string): AnalyzedProgram {
    const analyzed = this.analyzeProgram(input);

    this._programs[analyzed.programNumber] = analyzed;

    return analyzed;
  }

  /**
   * Batch load programs into memory
   */
  loadPrograms(programs: string[]): void {
    programs.forEach(program => this.loadProgram(program));
  }

  /**
   * Create a an {@link AnalyzedProgram} from a string
   */
  private analyzeProgram(input: string): AnalyzedProgram {
    const { err, result } = analyze(input);

    return {
      err,
      input,
      ...result
    };
  }
}

export const runtime = new MacroRuntime();
