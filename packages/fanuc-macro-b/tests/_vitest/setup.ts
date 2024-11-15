import { expect } from "vitest";

import { toMatchToken } from "./toMatchToken";
import { toMatchWithinTolerance } from "./toMatchWithinTolerance";

expect.extend({ toMatchToken, toMatchWithinTolerance });
