import { cyan as _cyan, green as _green } from "ansi-colors";

export const cyan = (input: number | string) => _cyan(String(input));
export const green = (input: number | string) => _green(String(input));
