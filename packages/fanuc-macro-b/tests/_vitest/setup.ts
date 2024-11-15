import { expect } from "vitest";

import { toMatchToken } from "./toMatchToken";
import { toMatchWithinTolerance } from "./toMatchWithinTolerance";
import { toMatchWithPrecision } from "./toMatchWithPrecision";

expect.extend({
  toMatchToken,
  toMatchWithPrecision,
  toMatchWithinTolerance
});
