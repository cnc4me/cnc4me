import { AddressedValueCstChildren } from "../types/fanuc";
export declare class NcAddress {
    value: number;
    private _address;
    private _isNegative;
    get prefix(): string;
    get image(): string;
    constructor(ctx: AddressedValueCstChildren);
}
