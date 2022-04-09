import { Modals } from "../NcSpec";

export interface ModalGroups {
  // @TODO this is bad, FIX THIS
  [K: string]: string;

  // motion
  GROUP_01: Modals.RAPID | Modals.FEED;

  // plane selection – XY, YZ, ZX
  GROUP_02: Modals.XY | Modals.XZ | Modals.YZ;

  // absolute / incremental mode
  GROUP_03: Modals.ABSOLUTE | Modals.INCREMENTAL;

  // feed rate mode
  GROUP_05: string;

  // units – inches / millimeters
  GROUP_06: string;

  // cutter radius compensation – CRC
  GROUP_07: string;

  // tool length offset – TLO
  GROUP_08: string;

  // return mode in canned cycles
  GROUP_10: string;

  // work coordinate system selection – WCSS
  GROUP_12: string;
}

export type ModalGroupStrings = keyof ModalGroups;
