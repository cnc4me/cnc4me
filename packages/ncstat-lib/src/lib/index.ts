import Debug, { Debugger } from "debug";

export * from "./guards";

/**
 * Pad a single digit address into a two digit
 *
 * @example zeroPadAddress("G1") // "G01"
 */
export function zeroPadAddress(input: string): string {
  return input ? input[0] + `00${input.slice(1)}`.slice(-2) : "";
}

/**
 * Pad a single digit number with zeros
 *
 * Defaults to 4 place because it just does for now
 *
 * @example zeroPad(1) // "1"
 */
export function zeroPad(input: number): string {
  return `0000${input}`.slice(-4);
}

export function unwrap(str?: string): string {
  if (typeof str !== "string") {
    throw Error("Remove parenthesis from a string");
  }

  return str.replace("(", "").replace(")", "").trim();
}

export const debug = Debug("ncstat");

export const makeDebugger = (namespace: string): Debugger =>
  debug.extend(namespace);
