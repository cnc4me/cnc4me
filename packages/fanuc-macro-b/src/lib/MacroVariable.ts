export class MacroVariable {
  static create(init: { register: number; value: number }) {
    return new MacroVariable(init.register, init.value);
  }

  constructor(
    public register: number,
    public value: number = NaN
  ) {
    //
  }
}
