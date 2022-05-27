import { getImage, parseNumber } from "../utils";
export class NcAddress {
    value;
    _address;
    _isNegative;
    get prefix() {
        return this._address;
    }
    get image() {
        return `${this._address}${this.value}`;
    }
    constructor(ctx) {
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
