import { extractSourceLine } from "../utils/chevrotain";
import type { TrackedBlock } from "../core/interpreter/TrackedBlock";

export class MacroInterpreterError extends Error {
  //
}

export class BlockTrackingError extends MacroInterpreterError {
  constructor(block: TrackedBlock) {
    const source = extractSourceLine(block.line);
    super(`${block.tagImage} already exists @ L:${source}`);
  }
}
