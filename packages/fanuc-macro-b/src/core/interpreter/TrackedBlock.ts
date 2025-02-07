import { getChildren } from "../../utils/chevrotain";
import { getImage, parseImageAsInteger } from "../../utils/common";

import type { LineCstChildren, LineCstNode } from "../../types/fanuc";

export enum TrackingType {
  Untracked = "Untracked",
  N = "N",
  Do = "Do",
  End = "End"
}

export class TrackedBlock {
  N = NaN;
  id = NaN;
  tracking: TrackingType;
  line: LineCstChildren;
  tagImage: string;

  constructor(node: LineCstNode) {
    this.tracking = TrackingType.Untracked;
    this.line = node.children;
    this.tagImage = "";

    if (this.line?.LineNumber) {
      // N1
      const image = getImage(this.line.LineNumber);
      this.N = parseInt(image.replace("N", ""));
      this.tracking = TrackingType.N;
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
    if (this.tracking !== TrackingType.Untracked) {
      this.tagImage = this.#writeTagImage();
    }
  }

  #writeTagImage(): string {
    const word =
      this.tracking === TrackingType.N //
        ? "N"
        : this.tracking.toUpperCase();
    const num =
      this.tracking === TrackingType.N //
        ? this.N
        : this.id;
    return `${word}${num}`;
  }
}
