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
  const workOffsetAddressMap: Record<number, number> = {
    53: 200,
    54: 220,
    55: 240,
    56: 260,
    57: 280,
    58: 300,
    59: 320
  };

  return 5000 + workOffsetAddressMap[offset + 52] + AXIS_ADRRESS_INDEX[axis];
}

/**
 * Compose an aux work offset axis register number by group and axis.
 *
 * The arguments `(1, "X")` will produce `7001`
 * The arguments `(2, "Y")` will produce `7202`
 * The arguments `(3, "Z")` will produce ``
 * The arguments `(48, "X")` will produce `7941`
 */
export function composeAuxWorkOffsetAxisRegister(offset: number, axis: string): number {
  const startOfAuxOffsetGroup = offset * ONE_GROUP_OF_OFFSET_REGISTERS;

  // eslint-disable-next-line prettier/prettier
  return (7000 - ONE_GROUP_OF_OFFSET_REGISTERS) + startOfAuxOffsetGroup + AXIS_ADRRESS_INDEX[axis];
}
