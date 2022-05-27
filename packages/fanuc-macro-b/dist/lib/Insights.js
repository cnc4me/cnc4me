import { map, max, min, uniq } from "lodash";
export class AddressInsight {
    ctx;
    value;
    /**
     * This the address to collect insights on, such as `X`, `Y`, `G10`, or `M6`
     */
    constructor(address) {
        this.value = address.value;
        this.ctx = address.prefix;
    }
}
export class InsightCollection {
    _entries = {};
    /**
     * Push an {@link AddressInsight} into the collection
     *
     * If the collection has not been started, and empty array
     * will be created first.
     *
     * @returns The current number of insights in the contexts' collection
     */
    collect(insight) {
        const insights = this._entries[insight.ctx];
        if (!Array.isArray(insights)) {
            this._entries[insight.ctx] = [];
        }
        this._entries[insight.ctx].push(insight);
        return this.get(insight.ctx).length;
    }
    /**
     * Get insights by context
     */
    get(ctx) {
        return this._entries[ctx] ?? [];
    }
    /**
     * Get insight values, by context
     */
    values(ctx) {
        return map(this.get(ctx), "value");
    }
    /**
     * Get all unique values from an array of insight values, by context
     */
    uniqValues(ctx) {
        return uniq(this.values(ctx));
    }
    /**
     * Get the minimum value from an array of insight values, by context
     */
    min(ctx) {
        return min(this.values(ctx)) ?? NaN;
    }
    /**
     * Get the maximum value from an array of insight values, by context
     */
    max(ctx) {
        return max(this.values(ctx)) ?? NaN;
    }
}
