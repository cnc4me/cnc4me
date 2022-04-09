import { CstChildrenDictionary, CstElement, CstNode } from "chevrotain";

import { unbox } from "./common";

/**
 * Get the element from a context
 */
export function elem<T extends CstChildrenDictionary, M extends keyof T>(
  ctx: T,
  childNode: M
): CstElement {
  return ctx[childNode][0];
}

/**
 * Get the children from a node if they are present, otherwise return the node
 */
export function children<T extends CstNode[]>(cstNodeArr: T): CstChildrenDictionary {
  const { children } = unbox(cstNodeArr);

  return children;
}
