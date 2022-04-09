import { TokenTypes } from "./tokens";

export interface NcLexerConfig {
  debug: boolean;
  tokens: Partial<Record<TokenTypes, boolean>>;
}

export interface NcParserConfig {
  debug: boolean;
  coolantCodes: number[];
  lexerConfig: Partial<NcLexerConfig>;
}
