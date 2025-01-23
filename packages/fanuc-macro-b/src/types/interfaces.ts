import type { AxisLabel, MotionType } from "../fsm/fsm.types";
import type { AddressedValue } from "../lib";
import type { IToken } from "chevrotain";

export interface IBaseInsight {
  ctx: string;
  value: number;
}

export type IProgramNumberLine = {
  number: number;
  title?: string;
};

export interface MachineCommand {
  motion?: MotionType;
  position?: Partial<Record<AxisLabel, number>>;
}

export interface IParsedLineData {
  hasVariable: boolean;
  /**
   * Parsed `N` line number (this is not the literal line, but explicit Nnnnn )
   */
  N: number;
  /**
   * If the line has an `END n`, this is the numeric value that must match a `DO n`
   */
  END: number;
  /**
   * Collection of all the `G` codes on the line
   */
  gCodes: IToken[];
  /**
   * Collection of all the `M` codes on the line
   */
  mCodes: IToken[];
  /**
   * Collection of all the ( comments ) found on the line
   */
  comments: string[];
  /**
   * Collection of all the non `G` & `M` codes on the line
   */
  addresses: AddressedValue[];
  gCodeMap: Record<string, boolean>;
  mCodeMap: Record<string, boolean>;
  /**
   * Map of letter addresses and their parsed values
   */
  addressMap: Record<string, number>;
}

export interface ParsedAddressData {
  image: string;
  value: number;
  address: string;
  isNegative: boolean;
}
