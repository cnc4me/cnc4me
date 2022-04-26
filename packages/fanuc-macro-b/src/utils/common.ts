import { IToken } from "chevrotain";

/**
 * Get a single value from a possible array with one element
 *
 * If passed an array, then return arr[0].
 * If passed a single value, then it is passed through.
 */
export function unbox<T>(arr: T | T[]): T {
  return Array.isArray(arr) ? arr[0] : arr;
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
 * Pad an integer with zeros
 */
export function zeroPad(input: number | string, length = 4) {
  return String(input).padStart(length, "0");
}

/**
 * Trim the first alphabetic character from a string
 */
export function stripFirstChar(address: string): string {
  return address.replace(/^[A-Z]/, "");
}

/**
 * If a string has a `.` assume it is a float
 */
export function parseNumber(value: string): number {
  return value.includes(".") ? parseFloat(value) : parseInt(value);
}

/**
 * Generate an array of integers, including start and finish.
 */
export function range(start: number, end: number) {
  end = end + 1; // include the end
  const length = (end - start) / 1;
  return Array.from({ length }, (_, i) => start + i);
}

/**
 * Convert Degrees to Radians
 */
export function degreeToRadian(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert Radians to Degrees
 */
export function radianToDegree(radians: number): number {
  return (180 / Math.PI) * radians;
}
