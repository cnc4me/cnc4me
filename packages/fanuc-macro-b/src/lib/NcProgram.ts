import type { ParsedLineData } from "../types";

export class NcProgram {
  #lines: ParsedLineData[];

  static create(init: NcProgramCreateConfig): NcProgram {
    const { id, title, lines } = init;
    const instance = new NcProgram(id, title ?? `PRG :${id}`);
    instance.setLines(lines);
    return instance;
  }

  constructor(
    public id: number,
    public title: string
  ) {
    this.#lines = [];
  }

  get lineCount(): number {
    return this.#lines.length;
  }

  getLines(): ParsedLineData[] {
    return this.#lines;
  }

  setLines(lines: ParsedLineData[]) {
    this.#lines.push(...lines);
  }
}

export type NcProgramCreateConfig = {
  id: number;
  title?: string;
  lines: ParsedLineData[];
};
