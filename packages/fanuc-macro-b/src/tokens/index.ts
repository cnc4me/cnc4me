/**
 * All tokens are exported in the lib folder's index as `T`
 */
export * from "./addresses";
export * from "./boolean";
export * from "./brackets";
export * from "./control-flow";
export { BuiltinFunction } from "./functions";
export * from "./numbers";
export * from "./operators";
export * from "./skipped";
export * from "./symbols";
export * from "./token.categories";

/**
 * @TODO
 *
 * Learned that applying a group to tokens
 * moves them from result.tokens to result.groups[GROUP]
 */
