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

/**
 * Spacing between each successive group of address space of the memory.
 */
export const ONE_GROUP_OF_OFFSET_REGISTERS = 20;

/**
 * This is stored in parameter 1022 of the machine
 */
export const AXIS_ADRRESS_INDEX: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
  B: 4
} as const;

export const WORK_OFFSET_ADDRESS_MAP: Record<number, number> = {
  0: 5200 /* G53 */,
  1: 5220 /* G54 */,
  2: 5240 /* G55 */,
  3: 5260 /* G56 */,
  4: 5280 /* G57 */,
  5: 5300 /* G58 */,
  6: 5320 /* G59 */
} as const;

type G10LabelToOffsetGroupMap = typeof TOOL_OFFSET_GROUP &
  typeof WORK_OFFSET_GROUP;
