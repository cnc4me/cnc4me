import { CstChildrenDictionary, CstElement } from "chevrotain";

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
export function children<T extends CstElement>(cstElem: T): CstChildrenDictionary | undefined {
  if ("children" in cstElem) {
    return cstElem.children;
  }

  return undefined;
}
