import { unbox } from "./common";
import type { CstChildrenDictionary, CstNode } from "chevrotain";
import type { OneOrMany } from "../types/generics";

/**
 * Get the element from a context
 */
export function getChild<T extends CstNode, M extends keyof T["children"]>(
  ctx: T,
  childNode: M,
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

export function extractSourceLine(
  children: CstChildrenDictionary,
  set?: Set<number>,
): number {
  const line = set ?? new Set<number>();
  for (const value of Object.values(children)) {
    if ("children" in value[0]) {
      const children = getChildren(value[0]);
      extractSourceLine(children, line);
    } else {
      const { startLine } = value[0];
      if (startLine) line.add(startLine);
    }
  }
  return Array.from(line)[0];
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
