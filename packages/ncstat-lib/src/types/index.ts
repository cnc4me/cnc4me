export * from "./axes";
export * from "./codes";
export * from "./configs";
export * from "./machine";
export * from "./modals";
export * from "./offsets";
export * from "./stats";
export * from "./tokens";

export type Tags = Set<string>;
export type StringDict = Record<string, string | undefined>;
export interface LineSpan {
  from: number;
  to: number;
}
