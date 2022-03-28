import type { IToken } from "chevrotain";

import { NcAddress } from "../lib/NcAddress";

export interface ParsedLineData {
  N: number;
  gCodes: IToken[];
  mCodes: IToken[];
  comments: string[];
  addresses: NcAddress[];
  gCodeMap: Record<string, boolean>;
  mCodeMap: Record<string, boolean>;
}

export interface ParsedAddressData {
  image: string;
  value: number;
  address: string;
  isNegative: boolean;
}
