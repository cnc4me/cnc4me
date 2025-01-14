import { PointerArray } from "../lib/PointerArray";

import type { CST } from "../types";

export interface IBlock {
  N: number;
  line: CST.LineCstChildren;
}

export class BlockArray extends PointerArray<IBlock> {
  setPointerToBlock(N: number) {
    const nodeIdx = this.findIndex(block => block.N === N);
    if (nodeIdx < 0) {
      throw new Error(`Block ${N} not found`);
    }
    this.setPointer(nodeIdx);
  }
}
