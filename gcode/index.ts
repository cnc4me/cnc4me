import { readFileSync } from "fs";
import { join } from "path";

export function getGcodeSample(filename: string): string {
  return readFileSync(join("..", "gcode", filename), "utf8");
}
