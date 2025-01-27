import { getChildren } from "../../utils/chevrotain";
import { getImage, parseImageAsInteger } from "../../utils/common";

import type { LineCstChildren, LineCstNode } from "../../types/fanuc";

export enum TrackingType {
  Untracked = "Untracked",
  Block = "Block",
  Do = "Do",
  End = "End"
}

export class TrackedBlock {
  N = NaN;
  id = NaN;
  tracking: TrackingType;
  line: LineCstChildren;

  constructor(node: LineCstNode) {
    this.tracking = TrackingType.Untracked;
    this.line = node.children;

    if (this.line?.LineNumber) {
      // N1
      const image = getImage(this.line.LineNumber);
      this.N = parseInt(image.replace("N", ""));
      this.tracking = TrackingType.Block;
    } else if (this.line?.WhileDoExpression) {
      // DO1
      const { WhileDoExpression } = this.line;
      const { DoStatement } = getChildren(WhileDoExpression);
      const { BlockNumber } = getChildren(DoStatement);

      this.id = parseImageAsInteger(BlockNumber);
      this.tracking = TrackingType.Do;
    } else if (this.line?.EndStatement) {
      // END1
      const { EndStatement } = this.line;
      const { BlockNumber } = getChildren(EndStatement);

      this.id = parseImageAsInteger(BlockNumber);
      this.tracking = TrackingType.End;
    }
  }

  get tagImage(): string {
    const word =
      this.tracking === TrackingType.Block //
        ? "N"
        : this.tracking.toUpperCase();
    const num =
      this.tracking === TrackingType.Block //
        ? this.N
        : this.id;
    return `${word}${num}`;
  }
}
