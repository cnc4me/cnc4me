import { writeFileSync } from "fs";
import path from "path";

export function joinCwd(...parts: string[]) {
  return path.join(process.cwd(), ...parts);
}

export function writeFile(out: string, data: string) {
  writeFileSync(out, data);
  console.log(
    `Wrote to file \x1b[33m${out.replace(process.cwd(), ".")}\x1b[0m`
  );
}
