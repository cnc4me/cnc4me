import {
  CstChildrenDictionary,
  CstElement,
  CstNode,
  type IToken
} from "chevrotain";

import { box, getImage, unbox } from "./common";

import type { OneOrMany } from "../types/generics";

/**
 * Given a list of tokens, concat them together as their images.
 */
export function stringifyTokens(tokens: IToken[]) {
  return tokens.reduce((output, token) => `${output} ${token.image}`, "");
}

/**
 * Get the element from a context
 */
export function getChild<T extends CstNode, M extends keyof T["children"]>(
  ctx: T,
  childNode: M
) {
  const node = getChildren(ctx);
  return node[childNode];
}

/**
 * Get the children from a node if they are present, otherwise return the node
 */
export function getChildren<T extends OneOrMany<CstNode>>(ctx: T) {
  const node = unbox(ctx);
  return node.children as GetChildrenReturn<T>;
}

// Helper type to determine the return type based on T
type GetChildrenReturn<T> =
  T extends Array<infer U> // Check if T is an array
    ? U extends CstNode // Ensure the array elements are CstNodes
      ? U["children"] // Return the children type of the node
      : never
    : T extends CstNode // If T is a single CstNode
      ? T["children"] // Return its children type
      : never;
