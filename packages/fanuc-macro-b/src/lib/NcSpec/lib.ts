import { ParsedAddressData } from "../../types";
import { CodeDefinition } from "../../types/NcSpec";
import { G_CODE_TABLE } from "./gcodes";
import { M_CODE_TABLE } from "./mcodes";

/**
 * Helper method for creating {@link CodeDefinition}s
 */
export function describeCode(desc: string, group?: string): CodeDefinition {
  if (group) {
    return { desc, group };
  }

  return { desc };
}

/**
 * Return an M codes' definition
 *
 * @example ```
 *     defineGCode("G10")  // "PROGRAMMABLE_OFFSET_INPUT"
 * ```
 */
export function defineGCode(input: string): CodeDefinition {
  return G_CODE_TABLE[input] ?? describeCode("G_CODE_NOT_FOUND");
}

/**
 * Return an M codes' definition
 *
 * @example ```
 *     defineMCode("M30") // "PROGRAM_END"
 * ```
 */
export function defineMCode(input: string): CodeDefinition {
  return M_CODE_TABLE[input] ?? describeCode("M_CODE_NOT_FOUND");
}

/**
 * Return the definition for a G or M code
 *
 * @example ```
 *     getDefinition("G10") // "PROGRAMMABLE_OFFSET_INPUT"
 *     getDefinition("M09") // "COOLANT_OFF"
 * ```
 */
export function getDefinition({
  address,
  image
}: ParsedAddressData): CodeDefinition {
  const lookupFn = address === "M" ? defineMCode : defineGCode;

  return lookupFn(image);
}
