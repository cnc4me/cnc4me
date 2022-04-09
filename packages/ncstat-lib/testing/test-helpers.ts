import fs from "fs";
import path from "path";

export function getDemoFileContents(filename: string): string {
  const filepath = path.join(__dirname, "..", "..", "demo", filename);

  // eslint-disable-next-line no-sync
  return fs.readFileSync(filepath, "utf8");
}
