function range(start, stop) {
  stop = stop + 1; // inclusive
  return Array.from({ length: (stop - start) / 1 }, (_, i) => start + i);
}

export class MacroVariables {
  vars: Map<number, number | typeof NaN>;

  static createLocalSet() {
    return new MacroVariables(1, 33);
  }

  constructor(start: number, end: number) {
    this.vars = new Map();

    range(start, end).forEach(i => this.initVar(i));
  }

  read(key: number) {
    return this.vars.get(key);
  }

  write(key: number, value: number) {
    return this.vars.set(key, value);
  }

  zeroVar(key: number) {
    return this.write(key, 0);
  }

  private initVar(key: number) {
    return this.write(key, NaN);
  }
}

export default MacroVariables;
