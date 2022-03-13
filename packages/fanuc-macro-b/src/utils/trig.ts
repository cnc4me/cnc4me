/**
 * Convert Degrees to Radians
 */
export function degreeToRadian(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert Radians to Degrees
 */
export function radianToDegree(radians: number): number {
  return (180 / Math.PI) * radians;
}
