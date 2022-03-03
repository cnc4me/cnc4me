import { writeFileSync } from "fs";
import { join } from "path";

export default function output(filename: string, data: string) {
  writeFileSync(join(__dirname, "out", filename), data);
}
