type G10LabelToOffsetGroupMap = typeof TOOL_OFFSET_GROUP &
  typeof WORK_OFFSET_GROUP;

/**
 * Mapping of tool offsets related G10 line "L" groups to their names.
 */
const TOOL_OFFSET_GROUP = {
  LENGTH_COMP: 10,
  LENGTH: 11,
  DIAMETER_COMP: 12,
  DIAMETER: 13
} as const;

/**
 * Mapping of work offsets related G10 line "L" groups to their names.
 */
const WORK_OFFSET_GROUP = {
  COMMON: 2,
  AUX: 20
} as const;

/**
 * Export all the groups
 */
export const OFFSET_GROUPS = {
  TOOL: TOOL_OFFSET_GROUP,
  WORK: WORK_OFFSET_GROUP
} as const;

/**
 * Mapping of tool offset group labels to their respective G10 `L` value
 */
export const G10_L_GROUPS: Record<string, keyof G10LabelToOffsetGroupMap> = {
  2: "COMMON",
  10: "LENGTH_COMP",
  11: "LENGTH",
  12: "DIAMETER_COMP",
  13: "DIAMETER",
  20: "AUX"
} as const;
