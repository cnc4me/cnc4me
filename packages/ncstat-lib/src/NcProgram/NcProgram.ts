import { get, map, max, min, reject, uniq } from "lodash/fp";

import { zeroPad } from "../lib";
import { NcToken } from "../NcLexer";
import { NcBlock } from "../NcParser";
import {
  AxesLimits,
  AxisLimits,
  HmcAxis,
  LineSpan,
  ProgramStats,
  StringDict
} from "../types";
import { NcRegion } from "./NcRegion";
import { Tool, Toolpath } from "./Toolpath";

export const HEADER_START_LINE = 2;

export class NcProgram {
  readonly blocks: NcBlock[] = [];
  readonly toolpaths: Toolpath[] = [];

  name: string | null = null;
  number!: number;
  defaults = {
    headerSeparator: " - ", // Taken from the default Mastercam post
    ignoreProgramDelimeters: true // This will ignore "%" as line #1
  };

  // constructor() {}

  get tokens(): NcToken[] {
    return this.blocks.reduce((tokens, block) => {
      return [...tokens, ...block.tokens];
    }, [] as NcToken[]);
  }

  get tokenCount(): number {
    return this.tokens.length;
  }

  get blockCount(): number {
    return this.blocks.length;
  }

  get toolpathCount(): number {
    return this.toolpaths.length;
  }

  get toolchangeCount(): number {
    return this.blocks.reduce((total: number, block: NcBlock) => {
      if (block.hasToolCall && block.hasToolChange) {
        return 1 + total;
      }

      return total;
    }, 0);
  }

  // get toollist(): any[] {
  //   return map(
  //     (path: Toolpath) => path.tool,
  //     this.getToolPathsWithTools()
  //   );
  // }

  get header(): StringDict {
    const header = this.getHeader();

    return header.reduce((accum, line) => {
      const [key, value] = line.split(this.defaults.headerSeparator);

      accum[key] = value;

      return accum;
    }, {} as StringDict);
  }

  get g10s(): string[] {
    return this.reduceToArray((uses, block) => {
      if (block.gCodes.includes("G10")) {
        uses.push(block.toString());
      }

      return uses;
    });
  }

  // get g10s(): string[] {
  //   return reduce(
  //     (uses, block: NcBlock) => {
  //       if (block.gCodes.includes("G10")) {
  //         uses.push(block.toString());
  //       }

  //       return uses;
  //     },
  //     [] as string[],
  //     this.blocks
  //   );
  // }

  get uses(): string[] {
    return this.blocks.reduce((uses, block: NcBlock) => {
      if (block.comment && block.comment.startsWith("USE")) {
        const useText = block.comment.replace(/^USE/, "").trim();

        uses.push(useText);
      }

      return uses;
    }, [] as string[]);
  }

  get offsets(): string[] {
    return this.blocks.reduce((accum: string[], block: NcBlock) => {
      if (block.workOffset) {
        accum.push(block.workOffset);
      }

      return accum;
    }, [] as string[]);
  }

  get limits(): AxesLimits {
    return {
      B: this.getAxisLimits("B"),
      X: this.getAxisLimits("X"),
      Y: this.getAxisLimits("Y"),
      Z: this.getAxisLimits("Z")
    };
  }

  get regionSpans(): LineSpan[] {
    const regionSpans: LineSpan[] = [];

    [...this.blankLines, this.blockCount].forEach(lineNumber => {
      regionSpans.push({
        from: (regionSpans[regionSpans.length - 1]?.to ?? 0) + 2,
        to: lineNumber - 1
      });
    });

    return regionSpans;
  }

  /**
   * Get an array of all the blank line numbers in the program
   *
   * The line numbers are based from "%" as line #0
   */
  get blankLines(): number[] {
    return this.blocks.reduce((accum, block) => {
      if (block.isEmpty) {
        accum.push(block.sourceLine);
      }

      return accum;
    }, [] as number[]);
  }

  /**
   * The number of blank lines in a program
   */
  get blankLineCount(): number {
    return this.blankLines.length;
  }

  appendBlock(block: NcBlock): this {
    this.blocks.push(block);

    return this;
  }

  getAxisValues(axis: HmcAxis): number[] {
    const values: number[] = uniq(map(get(axis), this.blocks));

    return reject(isNaN, values);
  }

  getAxisLimits(axis: HmcAxis): AxisLimits {
    const values = this.getAxisValues(axis);

    return {
      min: min(values) ?? NaN,
      max: max(values) ?? NaN
    };
  }

  /**
   * Get a span of blocks, as an array from the program
   *
   * Line numbers are indexed from "%" as line #0
   */
  getLines(from: number, to: number): NcBlock[] {
    const blocks = this.blocks.slice(from, to + 1);
    // console.log(blocks);
    return blocks;
  }

  // get workOffsets(): number[] {
  //   return this.blocks.map(block => block.tokens).reduce();
  // }

  // get toolpathsWithTools(): Toolpath[] {
  //   return filter("hasTool", this.toolpaths);
  // }

  /**
   * Get the header of the program
   *
   * "header" is defined as the first {@link NcRegion}
   * of comments found in the {@link NcProgram}
   */
  getHeader(): string[] {
    /**
     * Starting from "2" will skip over % and the
     * program number, collecting comments until
     * a blank line is found.
     */
    return this.collectCommentsFrom(HEADER_START_LINE);
  }

  /**
   * Get the subheader of the program
   *
   * "subheader" is defined as the second {@link NcRegion};
   * collected comments found in the {@link NcProgram}
   *
   * Starting from the end of the "header" {@link NcRegion},
   * comments are collected until a blank line is found.
   *
   * This is usually a block of G10 lines in H&B
   * posted programs.
   */
  getSubHeader(): string[] {
    const endLineNum = HEADER_START_LINE + this.getHeader().length + 1;
    const blocks = this.collectBlocksFrom(endLineNum);

    return blocks.map(block => block.toString());
  }

  /**
   * Get the notes of the program
   *
   * "notes" is defined as a third {@link NcRegion};
   * collected comments found in the {@link NcProgram}
   *
   * Starting from the end of the "subheader" {@link NcRegion},
   * comments are collected until a blank line is found.
   */
  getNotes(): string[] {
    const endLineNum =
      HEADER_START_LINE +
      (this.getHeader().length + 1) +
      (this.getSubHeader().length + 1);

    return this.collectCommentsFrom(endLineNum);
  }

  /**
   * Create a {@link NcRegion} from a span of lines
   */
  getRegion(from: number, to: number): NcRegion {
    return NcRegion.create(this.getLines(from, to));
  }

  /**
   * Parse the program for blank lines and slice into {@link NcRegion}
   */
  getRegions(): NcRegion[] {
    return this.regionSpans.map(({ from, to }) =>
      this.getRegion(from, to)
    );
  }

  // getRegionFromLine(_lineNumber: number): any {
  //   return {};
  // }

  /**
   * Summary of the {@link NcProgram}
   */
  getStats(): ProgramStats {
    return {
      limits: this.limits,
      // workOffsets: this.getWorkOffsets(),
      tokens: { count: this.tokenCount },
      blocks: { count: this.blockCount },
      toolpaths: { count: this.toolpathCount },
      toolchanges: { count: this.toolchangeCount }
    };
  }

  getTools(): Tool[] {
    return this.toolpaths.map(toolpath => toolpath.tool);
  }

  getToolpaths(): Toolpath[] {
    return this.toolpaths;
  }

  getToolpath(index: number): Toolpath {
    return this.toolpaths[index];
  }

  queryHeader(searchKey: string): string | undefined {
    const header = this.getHeader();
    const comment = header.find(c => c.startsWith(searchKey));

    return comment
      ? comment.split(this.defaults.headerSeparator)[1]
      : undefined;
  }

  toString(): string {
    return this.blocks.join("\n");
  }

  toStringWithLineNumbers(): string {
    return this.blocks
      .map((value, index) => `N${zeroPad(index)} ${value}`)
      .join("\n");
  }

  /**
   * Extract lines as a {@link NcRegion}
   *
   * Given a starting line, this method will consume
   * {@link NcBlock}s until it reaches an empty line.
   */
  // getRegionFromLine(startLine: number): NcRegion {
  //   const getRegion = regionFactory(startLine);

  //   return getRegion(this.blocks);
  // }

  private collectCommentsFrom(start: number): string[] {
    const comments: string[] = [];

    for (const block of this.blocks.slice(start)) {
      if (block.isEmpty) break;
      if (block.comment) comments.push(block?.comment);
    }

    return comments;
  }

  private collectBlocksFrom(start: number): NcBlock[] {
    const blocks: NcBlock[] = [];

    for (const block of this.blocks.slice(start)) {
      if (block.isEmpty) break;
      blocks.push(block);
    }

    return blocks;
  }

  /**
   * Iterate the blocks with a reducer
   */
  private reduceToArray(
    reducer: (
      previousValue: string[],
      currentValue: NcBlock,
      currentIndex: number,
      array: NcBlock[]
    ) => string[]
  ): string[] {
    return this.blocks.reduce(reducer, [] as string[]);
  }
}
