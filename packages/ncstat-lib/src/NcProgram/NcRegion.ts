import { NcBlock } from "../NcParser";

/**
 * @TODO A Builder?
 */
export class NcRegion {
  static create(blocks: NcBlock[]): NcRegion {
    return new NcRegion(blocks);
  }

  start!: number;
  end!: number;

  /**
   * The "sourceLine - 1" is to ignore "%" as a line when referencing
   * program lines, not literal lines.
   */
  constructor(public blocks: NcBlock[] = []) {
    this.blocks = blocks;

    if (blocks.length > 0) {
      this.start = blocks[0].sourceLine;
      this.end = blocks[blocks.length - 1].sourceLine;
    }
  }

  get length(): number {
    return this.blocks.length;
  }

  push(block: NcBlock): this {
    this.blocks.push(block);

    return this;
  }

  toString(): string {
    return this.blocks.map(block => block.toString()).join("\n");
  }

  toArray(): string[] {
    return this.blocks.reduce((blocks, block) => {
      if (block.comment && block.isCommentBlock) {
        blocks.push(block.comment);
      } else {
        blocks.push(block.toString());
      }

      return blocks;
    }, [] as string[]);
  }
}
