import { getChildren } from "./chevrotain";
import { box } from "./common";
import type { CstChildrenDictionary, IToken } from "chevrotain";
import type { OneOrMany } from "../types/generics";

/**
 * Given a CstChildrenDictionary object, this function iterates over all of its keys.
 * For each key that holds a non-empty array, it determines whether the items are
 * tokens (with an "image" property) or CST nodes. It then concatenates the images
 * of any tokens found into one string.
 *
 * @param children The CstChildrenDictionary object from which to extract token images.
 * @returns A single string containing the concatenated token images.
 */
export function stringifyCst(children: CstChildrenDictionary): string {
  let result = "";
  // Loop through each property in the LineCstChildren object.
  for (const value of Object.values(children)) {
    if ("children" in value[0]) {
      const children = getChildren(value[0]);
      result += stringifyCst(children) + " ";
    } else {
      result += stringifyTokens(value[0]) + " ";
    }
  }
  return result.trim();
}

/**
 * Given a list of tokens, concat them together as their images.
 */
export function stringifyTokens(tokens: OneOrMany<IToken>): string {
  return box(tokens).reduce((output, token) => `${output} ${token.image}`, "");
}
