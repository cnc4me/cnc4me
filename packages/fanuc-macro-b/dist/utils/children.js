import { unbox } from "./common";
/**
 * Get the element from a context
 */
export function elem(ctx, childNode) {
    return ctx[childNode][0];
}
/**
 * Get the children from a node if they are present, otherwise return the node
 */
export function children(cstNodeArr) {
    const { children } = unbox(cstNodeArr);
    return children;
}
