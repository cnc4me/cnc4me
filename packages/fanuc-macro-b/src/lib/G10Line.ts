import { find } from "lodash";

import { ParsedLineData } from "../../types";
import { NcAddress } from "../NcAddress";

export class G10Line {
  private _line: ParsedLineData;

  static parse() {
    //
  }

  get L(): NcAddress | undefined {
    return this._getAddrByPrefix("L");
  }

  get P(): NcAddress | undefined {
    return this._getAddrByPrefix("P");
  }

  get R(): NcAddress | undefined {
    return this._getAddrByPrefix("R");
  }

  get B(): NcAddress | undefined {
    return this._getAddrByPrefix("B");
  }

  get X(): NcAddress | undefined {
    return this._getAddrByPrefix("X");
  }

  get Y(): NcAddress | undefined {
    return this._getAddrByPrefix("Y");
  }

  get Z(): NcAddress | undefined {
    return this._getAddrByPrefix("Z");
  }

  constructor(line: ParsedLineData) {
    this._line = line;
  }

  private _getAddrByPrefix(address: string): NcAddress | undefined {
    return find(this._line.addresses, ({ prefix }) => prefix === address);
  }
}
