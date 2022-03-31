import chance from "chance";

import type { AxisLocations } from "../types";

function randomPosition(min: number, max: number, fixed: number) {
  return chance.Chance().floating({ min, max, fixed });
}

/**
 * Generate a random machine position.
 */
export function randomAxisLocation(): Partial<AxisLocations> {
  return {
    X: randomPosition(-10, 10, 4),
    Y: randomPosition(0, 25, 4),
    Z: randomPosition(0, 12, 4)
  };
}
