import * as MemoryOffsetConstants from "./offsets.const";
import {
  getAuxWorkOffsetAxisRegister,
  getToolOffsetRegister,
  getWorkOffsetAxisRegister
} from "./registers";
import * as MemoryRegisterConstants from "./registers.const";

export { BinaryRegister } from "./BinaryRegister";
export * from "./registers";

export const MemoryConstants = {
  ...MemoryOffsetConstants,
  ...MemoryRegisterConstants
};

export const RegisterMap = {
  ToolOffset: getToolOffsetRegister,
  WorkOffset: getWorkOffsetAxisRegister,
  AuxWorkOffset: getAuxWorkOffsetAxisRegister
};
