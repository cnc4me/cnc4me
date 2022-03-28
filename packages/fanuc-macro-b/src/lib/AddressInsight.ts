import { max, min } from "lodash";

import { NcAddress } from "./NcAddress";

export class AddressInsight {
  private _address: string;
  private _values: NcAddress[] = [];

  get min() {
    return min(this.toArray());
  }

  get max() {
    return max(this.toArray());
  }

  constructor(address: string) {
    this._address = address;
  }

  collect(addr: NcAddress) {
    this._values.push(addr);
  }

  toArray(): number[] {
    return this._values.map(addr => addr.value);
  }
}
