import { NcBlock } from "../../NcParser/NcBlock";
import { defineGCode } from "../../NcSpec";
import { CodeDefinition } from "../../types";
import { Point } from "./Point";

interface CannedCycleConfig {
  Z: number;
  R: number;
  F: number;
  Q?: number;

  cycleCommand: string;
  retractCommand: string;
}

export class CannedCycle {
  static START_CODES = [
    "G73",
    "G74",
    "G81",
    "G82",
    "G83",
    "G84",
    "G85",
    "G86",
    "G87"
  ];

  static RETRACT_CODES = ["G98", "G99"];
  definition: CodeDefinition;

  static fromBlock(block: NcBlock): CannedCycle {
    if (!block.isStartOfCannedCycle) {
      throw Error(
        "The provided Block is not the start of a CannedCycle."
      );
    }

    return new CannedCycle({
      Q: block?.Q as number,
      Z: block?.Z as number,
      R: block?.R as number,
      F: block?.F as number,
      retractCommand: block.retractCommand as string,
      cycleCommand: block.cannedCycleStartCode as string
    });
  }

  Z: number;
  R: number;
  F: number;
  cycleCommand: string;
  retractCommand: string;

  Q?: number;
  I?: number;
  J?: number;
  K?: number;

  points: Point[] = [];

  constructor(config: CannedCycleConfig) {
    this.Z = config.Z;
    this.R = config.R;
    this.F = config.F;
    this.cycleCommand = config.cycleCommand;
    this.retractCommand = config.retractCommand;

    this.Q = config?.Q;
    this.definition = defineGCode(this.cycleCommand);
  }

  get peck(): number | undefined {
    return this.Q;
  }

  get length(): number {
    return this.points.length;
  }

  get depth(): number | undefined {
    return this.Z;
  }

  get retract(): number | undefined {
    return this.R;
  }

  get feedrate(): number | undefined {
    return this.F;
  }

  addPoint(obj: Point): void {
    this.points.push(obj);
  }
}
