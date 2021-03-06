/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { StyleFunction } from "ansi-colors";
import {
  cyan as __cyan,
  green as __green,
  magenta as __magenta,
  red as __red,
  yellow as __yellow
} from "ansi-colors";

/**
 * Patch the color functions to allow for numbers
 */
function patch(colorFn: StyleFunction) {
  return (input: number | string) => colorFn(`${input}`);
}

export const red = patch(__red);
export const cyan = patch(__cyan);
export const green = patch(__green);
export const yellow = patch(__yellow);
export const magenta = patch(__magenta);
