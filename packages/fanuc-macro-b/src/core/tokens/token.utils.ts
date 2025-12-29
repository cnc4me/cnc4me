import { createToken as _createToken, Lexer } from "chevrotain";
import type { ITokenConfig, TokenType } from "chevrotain";

export const Keyword = createCategory("Keyword");

/**
 * Utilize the generic to get the token name
 * @link https://github.com/Chevrotain/chevrotain/issues/1987#issuecomment-1709854026
 */
export function createToken<N extends string>(
  config: Omit<ITokenConfig, "name"> & { name: N },
) {
  return _createToken(config) as Omit<TokenType, "name"> & { name: N };
}

export function createCategory(name: string) {
  return createToken({
    name,
    group: "Category",
    pattern: Lexer.NA,
  });
}
