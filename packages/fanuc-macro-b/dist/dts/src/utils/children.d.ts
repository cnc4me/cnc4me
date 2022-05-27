import { CstChildrenDictionary, CstElement, CstNode } from "chevrotain";
/**
 * Get the element from a context
 */
export declare function elem<T extends CstChildrenDictionary, M extends keyof T>(ctx: T, childNode: M): CstElement;
/**
 * Get the children from a node if they are present, otherwise return the node
 */
export declare function children<T extends CstNode[]>(cstNodeArr: T): CstChildrenDictionary;
