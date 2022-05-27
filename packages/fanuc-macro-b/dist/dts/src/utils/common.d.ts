import { IToken } from "chevrotain";
/**
 * Get a single value from a possible array with one element
 *
 * If passed an array, then return arr[0].
 * If passed a single value, then it is passed through.
 */
export declare function unbox<T>(arr: T | T[]): T;
/**
 * Get the contents of a parenthesis wrapped comment.
 *
 * @example unwrapComment("( tacos )") = "tacos"
 */
export declare function unwrapComment(comment: string): string;
/**
 * Return the image property from a possible token
 */
export declare function getImage(token: IToken | IToken[]): string;
/**
 * Pad an integer with zeros
 */
export declare function zeroPad(input: number | string, length?: number): string;
/**
 * Trim the first alphabetic character from a string
 */
export declare function stripFirstChar(address: string): string;
/**
 * If a string has a `.` assume it is a float
 */
export declare function parseNumber(value: string): number;
/**
 * Generate an array of integers, including start and finish.
 */
export declare function range(start: number, end: number): number[];
/**
 * Convert Degrees to Radians
 */
export declare function degreeToRadian(degrees: number): number;
/**
 * Convert Radians to Degrees
 */
export declare function radianToDegree(radians: number): number;
