import type { IParsedLineData } from "../types";

export type NcProgramCreateConfig = {
  id: number;
  title?: string;
  lines: IParsedLineData[];
};

export class NcProgram {
  #lines: IParsedLineData[];

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

  getLines(): IParsedLineData[] {
    return this.#lines;
  }

  setLines(lines: IParsedLineData[]) {
    this.#lines.push(...lines);
  }
}
