/**
 * Mapping of tool offsets related G10 line "L" groups to their names.
 */
const TOOL_OFFSET_GROUP = {
  LENGTH: 11,
  LENGTH_COMP: 10,
  DIAMETER: 13,
  DIAMETER_COMP: 12
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
