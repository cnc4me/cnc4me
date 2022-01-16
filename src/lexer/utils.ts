import { createToken, Lexer, TokenType } from "chevrotain";
import fs from "fs";
import YAML from "yaml";

export function createCategory(name: string) {
  return createToken({ name, pattern: Lexer.NA });
}

export function basicToken(name: string, pattern: string | RegExp) {
  return createToken({ name, pattern });
}

export function AltTokenFactory(longer_alt: TokenType) {
  return (name: string, pattern: RegExp) =>
    createToken({ name, pattern, longer_alt });
}

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
