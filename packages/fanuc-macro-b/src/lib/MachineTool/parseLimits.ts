import type { AxisLimits, AxisLimitsInput } from "./AxisFSM";

export function parseLimits(limits: AxisLimitsInput): AxisLimits {
  if (typeof limits === "number") {
    return { min: -Math.abs(limits), max: Math.abs(limits) };
  }

  if (Array.isArray(limits)) {
    const [min, max] = limits;
    if (min === max) {
      throw new Error(`(+) & (-) limits cannot be equal`);
    }
    if (min > max) {
      throw new Error(`(-) limit cannot be greater than the (+) limit`);
    }
    return { min, max };
  }

  const { min, max } = limits;
  if (min === max) {
    throw new Error(`(+) & (-) limits cannot be equal`);
  }
  if (min > max) {
    throw new Error(`(-) limit cannot be greater than the (+) limit`);
  }
  return limits;
}
