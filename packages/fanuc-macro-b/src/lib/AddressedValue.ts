import { AddressedValueCstChildren } from "../types/fanuc";
import { getImage, parseNumber, stripFirstChar } from "../utils";

export class AddressedValue {
  value: number;

  private _address: string;
  private _isNegative: boolean;

  static create(ctx: AddressedValueCstChildren): AddressedValue {
    return new AddressedValue(ctx);
  }

  static parseForValue(input: string): number {
    return parseNumber(stripFirstChar(input));
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

  get prefix() {
    return this._address;
  }

  get image() {
    return `${this._address}${this.value}`;
  }
}
