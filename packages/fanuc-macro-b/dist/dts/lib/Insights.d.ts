import { NcAddress } from "./NcAddress";
export interface BaseInsight {
    ctx: string;
    value: number;
}
export declare class AddressInsight implements BaseInsight {
    ctx: string;
    value: number;
    /**
     * This the address to collect insights on, such as `X`, `Y`, `G10`, or `M6`
     */
    constructor(address: NcAddress);
}
export declare class InsightCollection {
    private _entries;
    /**
     * Push an {@link AddressInsight} into the collection
     *
     * If the collection has not been started, and empty array
     * will be created first.
     *
     * @returns The current number of insights in the contexts' collection
     */
    collect(insight: AddressInsight): number;
    /**
     * Get insights by context
     */
    get(ctx: string): AddressInsight[];
    /**
     * Get insight values, by context
     */
    values(ctx: string): number[];
    /**
     * Get all unique values from an array of insight values, by context
     */
    uniqValues(ctx: string): number[];
    /**
     * Get the minimum value from an array of insight values, by context
     */
    min(ctx: string): number;
    /**
     * Get the maximum value from an array of insight values, by context
     */
    max(ctx: string): number;
}
