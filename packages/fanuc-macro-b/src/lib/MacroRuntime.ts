import { MacroProgram, MacroProgramLoaded } from "../types";
import { parse } from "../utils";
import { cyan, green } from "../utils/colors";

function range(x: number, y: number): number[] {
  return x > y ? [] : [x, ...range(x + 1, y)];
}

export function errorLogger(): MacroProgramLoaded {
  return err => {
    if (err) {
      console.log(err);
    }
  };
}

/**
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime {
  private _activeProgram = NaN;
  private _vars = new Map<number, number>();
  private _programs: MacroProgram[] = [];

  get ProgramCount(): number {
    return this._programs.length;
  }

  get ActiveProgram(): number {
    return this._activeProgram;
  }

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
    console.log(`Programs Loaded: ${green(this._programs.length)}`);
    console.log(`Active Program: ${cyan(this._activeProgram)}`);
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
   * Load a MacroProgram into memory
   *
   * This method can create a program if given a string
   */
  loadProgram(input: string, onLoad?: MacroProgramLoaded) {
    const program = this.createProgram(input);

    if (program.errors.length === 0) {
      this._programs.push(program);

      if (typeof onLoad === "function") {
        const err = program.errors.length > 0 ? program.errors : null;
        onLoad(err, program);
      }
    }
  }

  /**
   * Create a MacroProgram from a string
   */
  private createProgram(input: string): MacroProgram {
    const { lexResult } = parse(input);

    return {
      input,
      ...lexResult
    };
  }
}

export const runtime = new MacroRuntime();
