import { makeDebugger } from "../../lib";
import { Address } from "./Address";

const debug = makeDebugger("parser:m-code");

export class Mcode extends Address {
  prefix = "M";

  constructor(value: number) {
    super("M", value);

    debug("%o", this.definition.desc);
  }

  get isPause(): boolean {
    return this.value === 0;
  }

  get isOpStop(): boolean {
    return this.value === 1;
  }

  get isEndOfProgram(): boolean {
    return this.value === 30;
  }
}
