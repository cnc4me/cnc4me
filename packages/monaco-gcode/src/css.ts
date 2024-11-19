import type { TokenThemeRule } from "./types";

export function generateCSS<T extends TokenThemeRule>(tokens: T[]) {
  return tokens
    .flatMap(token => {
      const { token: className, foreground, background, fontStyle } = token;
      const stylesheet: string[] = [`.${className} {`];
      if (fontStyle) stylesheet.push(`\tfont-style: ${fontStyle};`);
      if (foreground) stylesheet.push(`\tcolor: ${foreground};`);
      if (background) stylesheet.push(`\tbackground-color: ${background};`);
      stylesheet.push("}");
      return stylesheet;
    })
    .join("\n");
}
