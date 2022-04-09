// import { NcBlock } from "../NcBlock";
// import { NcToken } from "../NcLexer";

import { NcPosition } from "./axes";

// export type NcBlocks = NcBlock[] | Generator<NcBlock>;
// export type Tokens = NcToken[] | Generator<NcToken>;

// export interface CannedPoint extends Point {
//   I?: number;
//   J?: number;
//   K?: number;
//   R: number;
//   Q: number;
// }

export interface MovementEvent {
  from: NcPosition;
  to: NcPosition;
}
