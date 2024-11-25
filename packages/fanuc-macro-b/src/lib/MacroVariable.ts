export class MacroVariable {
  value: number;

  static create(init: { register: number; value: number }) {
    const macroVar = new MacroVariable(init.register);
    macroVar.value = init.value;
    return macroVar;
  }

  constructor(public register: number) {
    this.value = NaN;
  }
}
