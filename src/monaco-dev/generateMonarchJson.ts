import { BaseParser } from "chevrotain";

import { MonacoLangDef } from "./chrysalis";

export function generateMonarchJson<T extends BaseParser>(
  parser: T
): MonacoLangDef {
  console.log(parser);

  return { tokenizer: {} };
}
