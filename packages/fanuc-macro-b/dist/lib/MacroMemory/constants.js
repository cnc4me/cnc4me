/**
 * Mapping of tool offsets related G10 line "L" groups to their names.
 */
const TOOL_OFFSET_GROUP = {
    LENGTH_COMP: 10,
    LENGTH: 11,
    DIAMETER_COMP: 12,
    DIAMETER: 13
};
/**
 * Mapping of work offsets related G10 line "L" groups to their names.
 */
const WORK_OFFSET_GROUP = {
    COMMON: 2,
    AUX: 20
};
/**
 * Export all the groups
 */
export const OFFSET_GROUPS = {
    TOOL: TOOL_OFFSET_GROUP,
    WORK: WORK_OFFSET_GROUP
};
/**
 * Mapping of tool offset group labels to their respective G10 `L` value
 */
export const G10_L_GROUPS = {
    2: "COMMON",
    10: "LENGTH_COMP",
    11: "LENGTH",
    12: "DIAMETER_COMP",
    13: "DIAMETER",
    20: "AUX"
};
