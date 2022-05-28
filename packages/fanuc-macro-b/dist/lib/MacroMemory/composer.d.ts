/**
 * Compose a tool offset register number by group and tool num.
 */
export declare function composeToolOffsetRegister(group: number, toolNum: number): number;
/**
 * Compose a work offset axis register number by group and axis.
 *
 * - The arguments `(1, "X")` will produce `5221`
 * - The arguments `(2, "Y")` will produce `5242`
 * - The arguments `(3, "Z")` will produce `5263`
 * - The arguments `(4, "B")` will produce `5284`
 */
export declare function composeWorkOffsetAxisRegister(groupOffset: number, axis: string): number;
/**
 * Compose an aux work offset axis register number by coordinate group and axis.
 *
 * - The arguments `(1, "X")` will produce `7001`
 * - The arguments `(2, "Y")` will produce `7022`
 * - The arguments `(3, "Z")` will produce `7043`
 * - The arguments `(4, "B")` will produce `7064`
 * - The arguments `(48, "X")` will produce `7941`
 */
export declare function composeAuxWorkOffsetAxisRegister(pGroup: number, axis: string): number;
