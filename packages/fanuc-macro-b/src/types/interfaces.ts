import type { AddressedValue } from "../lib";
import type { IToken } from "chevrotain";

export interface IBaseInsight {
  ctx: string;
  value: number;
}

export interface ProgramIdentifier {
  programTitle: string;
  programNumber: number;
}

export interface InterpretedLines {
  result: ParsedLineData[];
}

export interface InterpretedProgram extends ProgramIdentifier {
  lines: ParsedLineData[];
}

export interface VariableRegister {
  register: number;
  value: number;
}

export interface ParsedLineData {
  /**
   * Parsed `N` line number (this is not the literal line, but explicit Nnnnn )
   */
  N: number;
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
