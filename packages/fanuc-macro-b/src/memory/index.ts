import * as MemoryOffsetConstants from "./offsets.const";
import * as MemoryRegisterConstants from "./registers.const";

export * from "./extractOffsets";
export * from "./offsets.const";
export * from "./parseG10";
export * from "./registers";

export const M = {
  ...MemoryRegisterConstants,
  ...MemoryOffsetConstants
};
