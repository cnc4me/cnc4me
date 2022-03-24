import type { IToken } from "chevrotain";

export interface ParsedLineData {
  N: number;
  gCodes: IToken[];
  mCodes: IToken[];
  comments: string[];
  addresses: ParsedAddressData[];
}

export interface ParsedAddressData {
  image: string;
  value: number;
  address: string;
  isNegative: boolean;
}
