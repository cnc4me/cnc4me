/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IToken } from "chevrotain";

import { lexer } from "../lib";

export const tokenize = (code: string) => lexer.tokenize(code);

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
 * @example unwrap("( tacos )") = "tacos"
 */
export function unwrap(comment: string): string {
  return comment.replace(/^\(/, "").replace(/\)$/, "").trim();
}

/**
 * Return the image property from a possible token
 */
export function getImage(token: IToken | IToken[]) {
  return unbox(token).image;
}

/**
 * Pad an integer with zeros
 */
export function zeroPad(input: number | string) {
  return String(input).padStart(4, "0");
}
