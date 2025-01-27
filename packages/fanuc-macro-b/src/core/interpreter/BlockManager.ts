import { GenericPointerList } from "../../lib/GenericPointerList";
import { Debuggers } from "../../utils/debug";
import { TrackedBlock, TrackingType } from "./TrackedBlock";

import type { CST } from "../../types";

export interface IBlock {
  N: number;
  DO?: number;
  END?: number;
  id: string;
  line: CST.LineCstChildren;
}

export class BlockManager extends GenericPointerList<TrackedBlock> {
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

  forEach(callback: (item: BlockManager["items"][number]) => void) {
    for (const item of this.items) {
      callback(item);
    }
  }

  pointerToBlock(N: number): void {
    this.#debug(`pointer to block ${N}`);
    const nodeIdx = this.findIndex(block => {
      return block.tracking === TrackingType.Block && block.N === N;
    });
    if (nodeIdx < 0) {
      throw new Error(`Block ${N} not found`);
    }
    this.#updatePointer(nodeIdx);
  }

  pointerToDoTag(id: number): void {
    this.#debug(`pointer to tag "DO${id}"`);
    const nodeIdx = this.findIndex(block => {
      return block.tracking === TrackingType.Do && block.id === id;
    });
    if (nodeIdx < 0) {
      throw new Error(`Block with tag "DO${id}" not found`);
    }
    this.#updatePointer(nodeIdx);
  }

  pointerToEndTag(id: number): void {
    this.#debug(`pointer to tag "END${id}"`);
    const nodeIdx = this.findIndex(block => {
      return block.tracking === TrackingType.End && block.id === id;
    });
    if (nodeIdx < 0) {
      throw new Error(`Block with tag "END${id}" not found`);
    }
    this.#updatePointer(nodeIdx);
  }

  #updatePointer(pointerIdx: number) {
    this.setPointer(pointerIdx);
    this.#debug("pointer is", this.pointer);
  }
}
