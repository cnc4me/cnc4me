declare type G10LabelToOffsetGroupMap = typeof TOOL_OFFSET_GROUP & typeof WORK_OFFSET_GROUP;
/**
 * Mapping of tool offsets related G10 line "L" groups to their names.
 */
declare const TOOL_OFFSET_GROUP: {
    readonly LENGTH_COMP: 10;
    readonly LENGTH: 11;
    readonly DIAMETER_COMP: 12;
    readonly DIAMETER: 13;
};
/**
 * Mapping of work offsets related G10 line "L" groups to their names.
 */
declare const WORK_OFFSET_GROUP: {
    readonly COMMON: 2;
    readonly AUX: 20;
};
/**
 * Export all the groups
 */
export declare const OFFSET_GROUPS: {
    readonly TOOL: {
        readonly LENGTH_COMP: 10;
        readonly LENGTH: 11;
        readonly DIAMETER_COMP: 12;
        readonly DIAMETER: 13;
    };
    readonly WORK: {
        readonly COMMON: 2;
        readonly AUX: 20;
    };
};
/**
 * Mapping of tool offset group labels to their respective G10 `L` value
 */
export declare const G10_L_GROUPS: Record<string, keyof G10LabelToOffsetGroupMap>;
export {};
