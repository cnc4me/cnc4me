import { NcToken } from "../../NcLexer";
import { Tokens } from "../../types";
import { NcBlock } from "./NcBlock";

export function* blockGenerator(
  tokens: Generator<NcToken>
): Generator<NcBlock> {
  let lineTokens: NcToken[] = [];

  for (const token of tokens) {
    if (token.type === Tokens.NEWLINE) {
      yield new NcBlock(lineTokens);
      lineTokens = [];
    } else {
      lineTokens.push(token);
    }
  }
}
