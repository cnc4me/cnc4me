import {
  AXIS_ADRRESS_INDEX,
  ONE_GROUP_OF_OFFSET_REGISTERS,
  WORK_OFFSET_ADDRESS_MAP
} from "./offsets.const";

export * from "./registers.const";

export const RegisterMap = {
  ToolOffset: getToolOffsetRegister,
  WorkOffset: getWorkOffsetAxisRegister,
  AuxWorkOffset: getAuxWorkOffsetAxisRegister
};

/**
 * Compose a tool offset register number by group and tool num.
 */
export function getToolOffsetRegister(group: number, toolNum: number): number {
  if (group < 10 || group > 13) {
    throw Error("Invalid tool group value.");
  }

  // eslint-disable-next-line prettier/prettier
  return (group * 1000) + Number(toolNum);
}

/**
 * Compose a work offset axis register number by group and axis.
 *
 * - The arguments `(1, "X")` will produce `5221`
 * - The arguments `(2, "Y")` will produce `5242`
 * - The arguments `(3, "Z")` will produce `5263`
 * - The arguments `(4, "B")` will produce `5284`
 */
export function getWorkOffsetAxisRegister(group: number, axis: string): number {
  if (group < 0 || group > 6) {
    throw Error(`Cannot compose a register for group: ${group}`);
  }

  return WORK_OFFSET_ADDRESS_MAP[group] + AXIS_ADRRESS_INDEX[axis];
}

/**
 * Compose an aux work offset axis register number by coordinate group and axis.
 *
 * - The arguments `(1, "X")` will produce `7001`
 * - The arguments `(2, "Y")` will produce `7022`
 * - The arguments `(3, "Z")` will produce `7043`
 * - The arguments `(4, "B")` will produce `7064`
 * - The arguments `(48, "X")` will produce `7941`
 */
export function getAuxWorkOffsetAxisRegister(
  group: number,
  axis: string
): number {
  const startOfAuxOffsetGroup = group * ONE_GROUP_OF_OFFSET_REGISTERS;

  // eslint-disable-next-line prettier/prettier
  return (7000 - ONE_GROUP_OF_OFFSET_REGISTERS) + startOfAuxOffsetGroup + AXIS_ADRRESS_INDEX[axis];
}
