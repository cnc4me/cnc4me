import { makeDebugger } from "../../lib";

const debug = makeDebugger("parser:tool");

export interface ToolDefinition {
  number: number;
  desc: string;
}

export class Tool {
  static create({ number, desc }: ToolDefinition): Tool {
    return new Tool(number, desc);
  }

  constructor(public number = 0, public desc = "") {
    this.number = number;
    this.desc = desc;

    debug(this.toString());
  }

  getToolInfo(): [number, Tool] {
    return [this.number, this];
  }

  toString(): string {
    return `T${this.number} | ${this.desc}`;
  }
}
