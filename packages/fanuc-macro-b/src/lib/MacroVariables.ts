/**
 * Wrapper around the `Map` to add extra functionality
 */
export class MacroVariables {
  private _vars: Map<number, number | typeof NaN>;

  static LocalSet() {
    return MacroVariables.group(1, 33);
  }

  static group(start: number, end: number) {
    return new MacroVariables(start, end);
  }

  constructor(start: number, end: number) {
    this._vars = new Map();

    end = end + 1; // include the end
    const length = (end - start) / 1;
    const range = Array.from({ length }, (_, i) => start + i);

    for (const idx of range) {
      this.init(idx);
    }
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

// eslint-disable-next-line import/no-default-export
export default MacroVariables;
