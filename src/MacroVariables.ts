function range(start, stop) {
  stop = stop + 1; // inclusive
  return Array.from({ length: (stop - start) / 1 }, (_, i) => start + i);
}

export class MacroVariables {
  private _vars: Map<number, number | typeof NaN>;

  static LocalSet() {
    return new MacroVariables(1, 33);
  }

  constructor(start: number, end: number) {
    this._vars = new Map();

    range(start, end).forEach(i => this.init(i));
  }

  getMap() {
    return this._vars;
  }

  read(key: number) {
    return this._vars.get(key);
  }

  write(key: number, value: number) {
    return this._vars.set(key, value);
  }

  has(key: number): boolean {
    return this._vars.has(key);
  }

  private init(key: number) {
    return this.write(key, NaN);
  }
}

export default MacroVariables;
