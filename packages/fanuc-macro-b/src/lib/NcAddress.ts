import { AddressedValueCstChildren } from "../types/fanuc";
import { getImage, parseNumber } from "../utils";

export class NcAddress {
  value: number;

  private _address: string;
  private _isNegative: boolean;

  get prefix() {
    return this._address;
  }

  get image() {
    return `${this._address}${this.value}`;
  }

  constructor(ctx: AddressedValueCstChildren) {
    this.value = NaN;
    this._address = getImage(ctx.Address);
    this._isNegative = Boolean(ctx?.Minus);

    if (ctx?.NumericValue) {
      const minus = this._isNegative ? "-" : "";
      this.value = parseNumber(`${minus}${getImage(ctx.NumericValue)}`);
    }

    return this;
  }
}
