/**
 * Mapping of tool offsets related G10 line "L" groups to their names.
 */
export const TOOL_OFFSETS = {
  TOOL_LENGTH: 11,
  TOOL_LENGTH_COMP: 10,
  TOOL_DIAMETER: 13,
  TOOL_DIAMETER_COMP: 12
} as const;

/**
 * Mapping of work offsets related G10 line "L" groups to their names.
 */
export const WORK_OFFSETS = {
  COMMON_WORK_OFFSET: 2,
  AUX_WORK_OFFSET: 20
} as const;

/**
 * Export all the groups for easy importing
 */
export const OFFSET_GROUPS = {
  ...WORK_OFFSETS,
  ...TOOL_OFFSETS
} as const;
