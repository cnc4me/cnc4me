import { Address } from "../NcParser";
import { CodeDefinition } from "../types";
import { G_CODE_TABLE } from "./fanuc";
import { M_CODE_TABLE } from "./mcodes";

/**
 * Helper method for creating {@link CodeDefinition}s
 */
function createDefinition(
  desc: string,
  group?: string
): CodeDefinition {
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
  return G_CODE_TABLE[input] ?? createDefinition("G_CODE_NOT_FOUND");
}

/**
 * Return an M codes' definition
 *
 * @example ```
 *     defineMCode("M30") // "PROGRAM_END"
 * ```
 */
export function defineMCode(input: string): CodeDefinition {
  return M_CODE_TABLE[input] ?? createDefinition("M_CODE_NOT_FOUND");
}

/**
 * Return the definition for a G or M code
 *
 * @example ```
 *     getDefinition("G10") // "PROGRAMMABLE_OFFSET_INPUT"
 *     getDefinition("M09") // "COOLANT_OFF"
 * ```
 */
export function getDefinition(address: Address): CodeDefinition {
  const lookupFn = address.prefix === "M" ? defineMCode : defineGCode;

  return lookupFn(address.toString());
}
