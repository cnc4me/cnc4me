import { BlockTrackingError } from "../../errors/interpreter";
import { GenericPointerList } from "../../lib/GenericPointerList";
import { Debuggers } from "../../utils/debug";
import { TrackedBlock, TrackingType } from "./TrackedBlock";
import type { CST } from "../../types";

export class BlockManager extends GenericPointerList<TrackedBlock> {
  #registry: Record<Exclude<TrackingType, TrackingType.Untracked>, number[]> = {
    [TrackingType.N]: [],
    [TrackingType.Do]: [],
    [TrackingType.End]: [],
  };
  #debug: debug.Debugger;

  constructor() {
    super();
    this.#debug = Debuggers.Interpreter.extend("BlockManager");
  }

  reset() {
    this.#debug(`resetting`);
    this.setItems([]);
    this.resetPointer();
    this.#registry.N = [];
    this.#registry.Do = [];
    this.#registry.End = [];
  }

  /**
   * Track a Line of gcode as a whole block
   *
   * @param node - LineCstNode to be tracked
   */
  trackLine(node: CST.LineCstNode) {
    const block = new TrackedBlock(node);
    this.#recordTracking(block);
    this.append(block);
  }

  pointerToBlock(N: number): void {
    this.#debug(`pointer to block ${N}`);
    const nodeIdx = this.findIndex((block) => {
      return block.tracking === TrackingType.N && block.N === N;
    });
    if (nodeIdx < 0) {
      throw new Error(`Block ${N} not found`);
    }
    this.#updatePointer(nodeIdx);
  }

  pointerToDoTag(id: number): void {
    this.#debug(`pointer to tag "DO${id}"`);
    const nodeIdx = this.findIndex((block) => {
      return block.tracking === TrackingType.Do && block.id === id;
    });
    if (nodeIdx < 0) {
      throw new Error(`Block with tag "DO${id}" not found`);
    }
    this.#updatePointer(nodeIdx);
  }

  pointerToEndTag(id: number): void {
    this.#debug(`pointer to tag "END${id}"`);
    const nodeIdx = this.findIndex((block) => {
      return block.tracking === TrackingType.End && block.id === id;
    });
    if (nodeIdx < 0) {
      throw new Error(`Block with tag "END${id}" not found`);
    }
    this.#updatePointer(nodeIdx);
  }

  #recordTracking(block: TrackedBlock) {
    if (block.tracking !== TrackingType.Untracked) {
      if (this.#isRegistered(block)) {
        throw new BlockTrackingError(block);
      }
      this.#registry[block.tracking].push(block.id);
      this.#debug("registered", block.tagImage);
    }
  }

  #isRegistered(block: TrackedBlock) {
    if (block.tracking === TrackingType.Untracked) return false;
    return this.#registry[block.tracking].includes(block.id);
  }

  /**
   * Updates the internal pointer to a specific TrackedBlock instance.
   *
   * @param pointerIdx - The index of the block in the list to set as the new pointer.
   */
  #updatePointer(pointerIdx: number) {
    this.setPointer(pointerIdx);
    this.#debug("pointer is", this.pointer);
  }
}
