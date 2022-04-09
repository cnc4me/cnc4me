export interface CodeDefinition {
  desc: string;
  group?: string;
}

export interface CodeTable {
  [K: string]: CodeDefinition;
}

// export type PositioningMode = "G90" | "G91";
// export type PlaneSelection = "G17" | "G18" | "G19";
