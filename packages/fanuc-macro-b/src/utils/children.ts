import { CstChildrenDictionary, CstElement } from "chevrotain";

/**
 * Get the children for a single array'ed node
 */
export function children<T extends CstChildrenDictionary, M extends keyof T>(ctx: T, childNode: M) {
  const nodeArr: CstElement[] = ctx[childNode];
  const node = Array.isArray(nodeArr) ? nodeArr[0] : nodeArr;

  if ("children" in node) {
    return node.children;
  } else {
    return node;
  }
}
