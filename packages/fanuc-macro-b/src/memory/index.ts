import * as MemoryOffsetConstants from "./offsets.const";
import * as MemoryRegisterConstants from "./registers.const";

export * from "./extractOffsets";
export * from "./offsets.const";
export * from "./registers";

export const M = {
  ...MemoryRegisterConstants,
  ...MemoryOffsetConstants
};
