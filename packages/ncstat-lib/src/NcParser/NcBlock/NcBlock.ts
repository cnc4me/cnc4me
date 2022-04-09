import { find, includes, intersection, prop } from "lodash/fp";

import { isValidModalGroup, unwrap, zeroPadAddress } from "../../lib";
import {
  filterByPrefix,
  findByPrefix,
  findByType,
  NcToken
} from "../../NcLexer";
import { CannedCycle } from "../../NcProgram";
import { G_CODE, gCodeStrings } from "../../NcSpec";
import {
  CommentToken,
  ModalGroups,
  ModalGroupStrings,
  NcPosition,
  Tokens,
  TokenTypes
} from "../../types";

export class NcBlock {
  static create(tokens: NcToken[]): NcBlock {
    return new NcBlock(tokens);
  }

  static test = {
    isEmptyBlock: prop<NcBlock, "isEmpty">("isEmpty")
  };

  // readonly tags: Tags = new Set<string>();
  readonly tokens: NcToken[] = [];
  readonly sourceLine: number;

  constructor(tokens: NcToken[]) {
    this.tokens = tokens;

    // Here we account for "%" being "line #0"
    this.sourceLine = this.tokens[0].line - 1;
  }

  toString(options = { includeNewlines: false }): string {
    if (options.includeNewlines) {
      return this.stringTokens.join(" ");
    }

    this.stringTokens.pop();

    return this.stringTokens.join(" ");
  }

  // $tag(tag: string): Tags {
  //   return this.tags.add(tag);
  // }

  // $unTag(tag: string): boolean {
  //   return this.tags.delete(tag);
  // }

  // $tagged(tag: string): boolean {
  //   return this.tags.has(tag);
  // }

  $has(prefix: string): boolean {
    return Boolean(find(["prefix", prefix], this.tokens));
  }

  $value(prefix: string): number | undefined {
    for (const token of this.tokens) {
      if (token.prefix === prefix) {
        return token.value as number;
      }
    }

    return undefined;
  }

  // hasToken(tokenType: TokenTypes) {
  //   return includes(["type", tokenType], this.tokens);
  // }

  // getToken(tokenType: TokenTypes): NcToken {
  //   return find(["type", tokenType], this.tokens);
  // }

  getModalByGroup(group: ModalGroupStrings): string | undefined {
    isValidModalGroup(group);

    const result = intersection(this.gCodes, gCodeStrings(group));

    if (result.length > 0) {
      return result[0];
    }

    return undefined;
  }

  get gCodes(): string[] {
    return filterByPrefix("G", this.tokens).map(token =>
      zeroPadAddress(token.text)
    );
  }

  get modals(): ModalGroups {
    const groups = Object.keys(G_CODE);

    // @TODO look into this
    return groups.reduce((accum, group) => {
      isValidModalGroup(group);

      const modal = this.getModalByGroup(group);

      if (modal) {
        // eslint-disable-next-line no-param-reassign
        accum = Object.assign(accum, { [group]: modal });
      }

      return accum;
    }, {} as ModalGroups);
  }

  get stringTokens(): string[] {
    return this.tokens.map(token => token.text);
  }

  get length(): number {
    return this.tokens.length;
  }

  get position(): Partial<NcPosition> {
    // @TODO use a constant from somewhere for this
    const axes = ["X", "Y", "Z", "B"];
    const position: Partial<NcPosition> = {};

    return axes.reduce((accum, axis) => {
      if (this.$has(axis)) {
        accum[axis] = this.$value(axis);
      }

      return accum;
    }, position);
  }

  get tokenCount(): number {
    return this.tokens.length;
  }

  get hasComment(): boolean {
    return (
      this.tokens.find(token => token.isA(Tokens.COMMENT)) !== undefined
    );
  }

  // get isCommentBlock(): boolean {
  //   return (
  //     this.tokens[0]?.type === Tokens.COMMENT &&
  //     this.tokens[1]?.type === Tokens.NEWLINE
  //   );
  // }

  get isEmpty(): boolean {
    const tokenIsNewline = this.tokens[0].isA(Tokens.NEWLINE);

    return this.tokens.length === 1 && tokenIsNewline;
  }

  get isCommentBlock(): boolean {
    return (
      this.tokens.length === 1 && this.tokens[0].isA(Tokens.COMMENT)
    );
  }

  get comment(): string | undefined {
    const token: CommentToken = findByType(
      Tokens.COMMENT,
      this.tokens
    ) as CommentToken;

    if (token?.value) {
      return unwrap(token.value);
    }

    return undefined;
  }

  get hasToolCall(): boolean {
    return this.$has("T");
  }

  // @TODO configurable toolchange codes
  get hasToolChange(): boolean {
    return this.M === 6;
  }

  get hasMovement(): boolean {
    // @TODO Manage this conflict with G code groups
    if (intersection(["G04", "G10", "G65"], this.gCodes).length > 0) {
      return false;
    }

    if (intersection(CannedCycle.START_CODES, this.gCodes).length > 0) {
      return false;
    }

    return (
      typeof this.B !== "undefined" ||
      typeof this.X !== "undefined" ||
      typeof this.Y !== "undefined" ||
      typeof this.Z !== "undefined"
    );
  }

  get retractCommand(): string | undefined {
    return this.getModalByGroup("GROUP_10");
  }

  get workOffset(): string | undefined {
    return this.getModalByGroup("GROUP_12");
  }

  get cannedCycleStartCode(): string | undefined {
    return intersection(CannedCycle.START_CODES, this.stringTokens)[0];
  }

  get isNline(): boolean {
    return this.$has("N");
  }

  get isStartOfCannedCycle(): boolean {
    return Boolean(this.cannedCycleStartCode);
  }

  get skipLevel(): number | undefined {
    const token = findByType(Tokens.BLK_SKIP, this.tokens);

    if (token) {
      return token.value as number;
    }

    return undefined;
  }

  get A(): number | undefined {
    return this.$value("A");
  }

  get B(): number | undefined {
    return this.$value("B");
  }

  get C(): number | undefined {
    return this.$value("C");
  }

  get D(): number | undefined {
    return this.$value("D");
  }

  get E(): number | undefined {
    return this.$value("E");
  }

  get F(): number | undefined {
    return this.$value("F");
  }

  get G(): number[] {
    return filterByPrefix("G", this.tokens).map(
      token => token.value
    ) as number[];
  }

  // get G(): NcToken[] {
  //   return filterByPrefix("G", this.tokens);
  // }

  get H(): number | undefined {
    return this.$value("H");
  }

  get I(): number | undefined {
    return this.$value("I");
  }

  get J(): number | undefined {
    return this.$value("J");
  }

  get K(): number | undefined {
    return this.$value("K");
  }

  get L(): number | undefined {
    return this.$value("L");
  }

  get M(): number | undefined {
    return this.$value("M");
  }

  get N(): number | undefined {
    return this.$value("N");
  }

  get O(): number | undefined {
    return this.$value("O");
  }

  get P(): number | undefined {
    return this.$value("P");
  }

  get Q(): number | undefined {
    return this.$value("Q");
  }

  get R(): number | undefined {
    return this.$value("R");
  }

  get S(): number | undefined {
    return this.$value("S");
  }

  get T(): number | undefined {
    return this.$value("T");
  }

  get U(): number | undefined {
    return this.$value("U");
  }

  get V(): number | undefined {
    return this.$value("V");
  }

  get W(): number | undefined {
    return this.$value("W");
  }

  get X(): number | undefined {
    return this.$value("X");
  }

  get Y(): number | undefined {
    return this.$value("Y");
  }

  get Z(): number | undefined {
    return this.$value("Z");
  }
}

export const isEmptyBlock = prop<NcBlock, "isEmpty">("isEmpty");
