import { NcAddress } from "../NcAddress";

export class AddressInsight {
  private _address: string;
  private _values: NcAddress[] = [];

  constructor(address: string) {
    this._address = address;
  }

  collect(addr: NcAddress) {
    this._values.push(addr);
  }
}
