import { PointerArray } from "../lib/PointerArray";
import { Debuggers } from "../utils/debug";

import type { CST } from "../types";

export interface IBlock {
  N: number;
  line: CST.LineCstChildren;
}

export class BlockCollection extends PointerArray<IBlock> {
  #debug: debug.Debugger;

  constructor() {
    super();
    this.#debug = Debuggers.Interpreter.extend("blocks");
  }

  reset() {
    this.#debug(`resetting`);
    this.setItems([]);
    this.resetPointer();
  }

  setPointerToBlock(N: number) {
    this.#debug(`pointer to block ${N}`);
    const nodeIdx = this.findIndex(block => block.N === N);
    if (nodeIdx < 0) {
      throw new Error(`Block ${N} not found`);
    }
    this.setPointer(nodeIdx);
    this.#debug("pointer is", this.pointer);
  }
}
