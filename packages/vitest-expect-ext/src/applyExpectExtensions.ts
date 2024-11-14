import { toBeWithinTolerance } from "./toBeWithinTolerance";
import { toMatchToken } from "./toMatchToken";

import type { ExpectStatic } from "vitest";

export function applyExpectExtensions(expect: ExpectStatic) {
  expect.extend({ toMatchToken, toBeWithinTolerance });
}
