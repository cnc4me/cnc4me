import { createToken, TokenType } from "chevrotain";
import fs from "fs";
import YAML from "yaml";

export default function parseYamlTokenFile(
  filename: string
): Record<string, TokenType> {
  const tokens: Record<string, TokenType> = {};

  const contents = fs.readFileSync(filename, "utf8");
  const tokenJson = YAML.parse(contents);
  const ids = Object.keys(tokenJson);

  ids.forEach(id => {
    tokens[id] = createToken(tokenJson[id]);
  });

  return tokens;
}
