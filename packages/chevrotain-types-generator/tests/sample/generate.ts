import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { DEFAULT_FILENAME, generateTsNode, generateTypes } from "../../src";
import { parser } from "./parser";

function output(filename: string, data: string) {
  const root = join(__dirname, "out");
  mkdirSync(root, { recursive: true });
  writeFileSync(join(root, filename), data);
}

export function generateTestFiles() {
  const ast = generateTsNode(parser);
  const json = JSON.stringify(ast, null, 2);
  output("ast.json", json);

  const types = generateTypes(parser);
  output(DEFAULT_FILENAME, types);
}
