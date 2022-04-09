import { NcToken } from "../NcLexer";

export enum Tokens {
  "EOF" = "EOF",
  "M_CODE" = "M_CODE",
  "ADDRESS" = "ADDRESS",
  "COMMENT" = "COMMENT",
  "NEWLINE" = "NEWLINE",
  "BLK_SKIP" = "BLK_SKIP",
  "VARIABLE" = "VARIABLE",
  "PRG_DELIM" = "PRG_DELIM",
  "PRG_NUMBER" = "PRG_NUMBER",
  "PAREN_OPEN" = "PAREN_OPEN",
  "PAREN_CLOSE" = "PAREN_CLOSE",
  "BRACKET_OPEN" = "BRACKET_OPEN",
  "BRACKET_CLOSE" = "BRACKET_CLOSE"
}

export type TokenTypes = keyof typeof Tokens;

export interface ParsedTokenizrValue {
  value: string;
  prefix: string;
}

export type TokenValue =
  | ParsedTokenizrValue
  | number
  | string
  | undefined;

// export interface

export interface GenericToken<T extends TokenTypes> extends NcToken {
  type: T;
}

export interface NumericToken extends NcToken {
  value: number;
}

export interface StringToken extends NcToken {
  value: string;
}

export interface CommentToken extends StringToken {
  type: Tokens.COMMENT;
}

export interface AddressToken extends NumericToken {
  type: Tokens.ADDRESS;
  prefix: string;
}
