import { HmcWorkOffsets, VmcWorkOffsets } from "../../types";

export function createVmcOffsets(): VmcWorkOffsets {
  const zeros = { X: 0, Y: 0, Z: 0 };

  return {
    53: zeros,
    54: zeros,
    55: zeros,
    56: zeros,
    57: zeros,
    58: zeros,
    59: zeros
  };
}

export function createHmcOffsets(): HmcWorkOffsets {
  const zeros = { X: 0, Y: 0, Z: 0, B: 0 };

  return {
    53: zeros,
    54: zeros,
    55: zeros,
    56: zeros,
    57: zeros,
    58: zeros,
    59: zeros
  };
}
