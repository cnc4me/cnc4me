import type { IToken } from "chevrotain";

/**
 * Generate an array of integers, including start and finish.
 */
export function range(start: number, end: number) {
  end = end + 1; // include the end
  const length = (end - start) / 1;
  return Array.from({ length }, (_, i) => start + i);
}

/**
 * Get a single value from a possible array with one element
 *
 * If passed an array, then return arr[0].
 * If passed a single value, then return it.
 */
export function unbox<T>(arr: T | T[]): T {
  return Array.isArray(arr) ? arr[0] : arr;
}

/**
 * Ensure that a given value or values are part of an array.
 *
 * If passed an array, then return it.
 * If passed a single value, then wrap it and return it.
 */
export function box<T>(arr: T | T[]) {
  return Array.isArray(arr) ? arr : [arr];
}

/**
 * Get the contents of a parenthesis wrapped comment.
 *
 * @example unwrapComment("( tacos )") = "tacos"
 */
export function unwrapComment(comment: string): string {
  return comment.replace(/^\(/, "").replace(/\)$/, "").trim();
}

/**
 * Return the image property from a possible token
 */
export function getImage(token: IToken | IToken[]): string {
  return unbox(token).image;
}

/**
 * Return the image property parsed as an integer
 */
export function parseImageAsInteger(token: IToken | IToken[]): number {
  return parseInt(unbox(token).image);
}

/**
 * Return the image property parsed as a float
 */
export function parseImageAsFloat(token: IToken | IToken[]): number {
  return parseFloat(unbox(token).image);
}

/**
 * Pad an integer with zeros
 */
export function zeroPad(input: number | string, length = 4) {
  return String(input).padStart(length, "0");
}

/**
 * Trim the first alphabetic character from a string
 */
export function stripFirstChar(address: string): string {
  return address.replace(/^[a-zA-Z]/, "");
}

/**
 * If a string has a `.` assume it is a float
 */
export function parseNumber(value: string): number {
  return value.includes(".") ? parseFloat(value) : parseInt(value);
}

/**
 * Parse a program number from a string or number.
 */
export function parseProgramNumber(programNumber: number | string): number {
  if (typeof programNumber === "string") {
    if (programNumber.startsWith("O")) {
      const num = programNumber.replace(/^O/, "");
      return parseInt(num);
    } else {
      return parseInt(programNumber);
    }
  } else {
    return programNumber;
  }
}
