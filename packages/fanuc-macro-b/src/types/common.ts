import { CstNode, IToken } from "chevrotain";

import { NamedWithChildren } from "../types";

export type NamedWithChildren<T> = T & { name: string; children: CstNode[] };
export type CstNodeWithChildren = NamedWithChildren<CstNode>;
export type CstNodeRecords = Record<string, CstNode[] | CstNodeWithChildren[]>;

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
 * Get the children for a single array'ed node
 */
export function children<M extends keyof T, T extends CstNodeRecords>(childNode: M, ctx: T) {
  const node = unbox(ctx[childNode]);

  return node.children;
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
export function getImage(token: IToken | IToken[]): string {
  return unbox(token).image;
}

/**
 * Pad an integer with zeros
 */
export function zeroPad(input: number | string) {
  return String(input).padStart(4, "0");
}

/**
 * Trim the first alphabetic character from a string
 */
export function trimLeadingChar(address: string): string {
  return address.replace(/^[A-Z]/, "");
}

/**
 * If a string has a `.` assume it is a float
 */
export function parseNumber(value: string): number {
  return value.includes(".") ? parseFloat(value) : parseInt(value);
}
