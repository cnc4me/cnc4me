import type {
  Monaco,
  MonacoLanguageBracket,
  MonacoTokenizerRule,
  MonarchLanguage,
  MonarchLanguageBracket,
  NamedTokenThemeRule,
  ThemeData,
  TokenizerRules,
  TokenThemeRule
} from "./types";
import type { BaseParser, TokenType } from "chevrotain";

export function createMonarchLanguage<T extends string>(
  brackets: MonarchLanguageBracket[],
  rules: TokenizerRules<T>
) {
  return {
    brackets,
    tokenizer: {
      root: rules
    }
  } as MonarchLanguage;
}

export function createTheme<T extends string>(
  theme: ThemeData & { rules: NamedTokenThemeRule<T>[] }
) {
  return theme;
}

export function createThemeRule<T extends string>(rule: TokenThemeRule) {
  const token = rule.token as T;
  return Object.assign(rule, { token });
}

export function createThemeRules<T extends string>(rules: TokenThemeRule[]) {
  return rules.map(rule => createThemeRule<T>(rule));
}

export function createLanguageRule<T extends string>(regex: RegExp, token: T) {
  return [regex, token] as [RegExp, T];
}

export function createLanguageRules<T extends string>(
  rules: TokenizerRules<T>
) {
  return rules.map(([r, t]) => createLanguageRule(r, t));
}

export function createBracketRule<T extends string>(
  bracket: MonacoLanguageBracket<T>
) {
  return {
    open: bracket[0],
    close: bracket[1],
    token: bracket[2]
  };
}

export function createBracketRules<T extends string>(
  brackets: MonacoLanguageBracket<T>[]
) {
  return brackets.map(b => createBracketRule<T>(b));
}

/**
 * Given a Chevrotain parser, generate a Monarch language definition
 *
 * @TODO look into this, and actually generate it
 */
export function generateMonarchLanguageFromChevrotainTokens(
  tokens: TokenType[],
  brackets: Monaco.languages.IMonarchLanguageBracket[],
  rules: MonacoTokenizerRule[]
): Monaco.languages.IMonarchLanguage {
  const mapped = tokens.map(tok => {
    return {
      token: tok.name,
      group: tok.GROUP,
      pattern: tok.PATTERN
    };
  });

  return mapped;
  return {
    brackets,
    tokenizer: {
      root: rules
    }
  };
}

/**
 * Given a Chevrotain parser, generate a Monarch language definition
 *
 * @TODO look into this, and actually generate it
 */
export function generateMonarchLanguageFromChevrotainParser<
  T extends BaseParser
>(
  parser: T,
  brackets: Monaco.languages.IMonarchLanguageBracket[],
  rules: MonacoTokenizerRule[]
): Monaco.languages.IMonarchLanguage {
  // console.log(parser);

  return {
    brackets,
    tokenizer: {
      root: rules
    }
  };
}
