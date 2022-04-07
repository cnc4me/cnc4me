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
  if (offset < 0 || offset > 6) {
    throw Error(`Cannot compose an offset from input: ${offset}`);
  }

  const workOffsetAddressMap: Record<number, number> = {
    0: 5200 /* G53 */,
    1: 5220 /* G54 */,
    2: 5240 /* G55 */,
    3: 5260 /* G56 */,
    4: 5280 /* G57 */,
    5: 5300 /* G58 */,
    6: 5320 /* G59 */
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
