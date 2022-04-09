import { G_CODE_MODAL_GROUPS } from "../NcSpec/gcodes";
import { ModalGroupStrings } from "../types";

export function isNumber(x: unknown): x is number {
  return typeof x === "number";
}

export function isString(x: unknown): x is string {
  return typeof x === "string";
}

export function isValidModalGroup(
  value: string
): value is ModalGroupStrings {
  return G_CODE_MODAL_GROUPS.includes(value);
}

export function assertValidModalGroup(
  value: string
): asserts value is ModalGroupStrings {
  if (!isValidModalGroup(value)) {
    const groups = G_CODE_MODAL_GROUPS.join(" | ");

    throw Error(`Expected one of [ ${groups} ]", got ${value}"`);
  }
}

export function assertisValidModalGroups(
  groups: string[]
): groups is string[] {
  const isValidStringModalGroup = (value: string): boolean =>
    isString(value) && isValidModalGroup(value);

  return groups.every(isValidStringModalGroup);
}

export function isValidModalGroups(
  groups: string[]
): groups is string[] {
  const isValidStringModalGroup = (value: string): boolean =>
    isString(value) && isValidModalGroup(value);

  return groups.every(isValidStringModalGroup);
}
