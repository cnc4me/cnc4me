import { createToken, Lexer, TokenType } from "chevrotain";

import parseYamlTokenFile from "./parseYamlTokenFile";

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
