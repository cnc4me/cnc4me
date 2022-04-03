/**
 * Spacing between each successive group of address space of the memory.
 */
const ONE_GROUP_OF_OFFSET_REGISTERS = 20;

/**
 * This is stored in parameter 1022 of the machine
 */
const AXIS_ADRRESS_INDEX: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
  B: 4
} as const;

/**
 * Compose a tool offset register number by group and tool num.
 */
export function composeToolOffsetRegister(group: number, toolNum: number): number {
  if (group < 10 || group > 13) {
    throw Error("Invalid tool group value.");
  }

  // eslint-disable-next-line prettier/prettier
  return (group * 1000) + toolNum;
}

/**
 * Compose a work offset axis register number by group and axis.
 *
 * The arguments `(1, "X")` will produce `5221`
 * The arguments `(2, "Y")` will produce `5242`
 * The arguments `(3, "Z")` will produce `5263`
 * The arguments `(4, "B")` will produce `5284`
 */
export function composeWorkOffsetAxisRegister(offset: number, axis: string): number {
  /**
   * Renishaw EasySet utilizes incrementing `S` values to set offsets.
   * 1=54, 2=55, 3=56, etc...
   */
  if (offset < 52) {
    offset += 52;
  }

  const workOffsetAddressMap: Record<number, number> = {
    53: 5200,
    54: 5220,
    55: 5240,
    56: 5260,
    57: 5280,
    58: 5300,
    59: 5320
  };

  return workOffsetAddressMap[offset] + AXIS_ADRRESS_INDEX[axis];
}

/**
 * Compose an aux work offset axis register number by group and axis.
 *
 * The arguments `(1, "X")` will produce `7001`
 * The arguments `(2, "Y")` will produce `7022`
 * The arguments `(3, "Z")` will produce `7043`
 * The arguments `(4, "B")` will produce `7064`
 * The arguments `(48, "X")` will produce `7941`
 */
export function composeAuxWorkOffsetAxisRegister(offset: number, axis: string): number {
  const startOfAuxOffsetGroup = offset * ONE_GROUP_OF_OFFSET_REGISTERS;

  // eslint-disable-next-line prettier/prettier
  return (7000 - ONE_GROUP_OF_OFFSET_REGISTERS) + startOfAuxOffsetGroup + AXIS_ADRRESS_INDEX[axis];
}
