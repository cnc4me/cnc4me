import { NcPosition } from ".";

export interface VmcWorkOffsets {
  [K: number]: Omit<NcPosition, "B">;
}

export interface HmcWorkOffsets {
  [K: number]: NcPosition;
}
