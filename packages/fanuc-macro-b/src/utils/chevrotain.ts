import { CstChildrenDictionary, CstElement, CstNode } from "chevrotain";

import { unbox } from "./common";

/**
 * Get the element from a context
 */
export function getElem<T extends CstChildrenDictionary, M extends keyof T>(
  ctx: T,
  childNode: M
): CstElement {
  return ctx[childNode][0];
}

/**
 * Get the children from a node if they are present, otherwise return the node
 */
export function getChildren<T extends CstNode[]>(cstNodeArr: T) {
  const node = unbox(cstNodeArr);
  return node.children;
}
