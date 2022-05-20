import { Chance } from "chance";

import type { WorkCoordinateHash } from "../src";

const chance = Chance();

export function rand(min: number, max: number): number {
  return chance.floating({ fixed: 4, min, max });
}

export const rX = () => rand(-12, 12);
export const rY = () => rand(0, 24);
export const rZ = () => rand(0, 14);
export const rB = () => rand(-360, 360);

export const getRandomAxisLocations = (): WorkCoordinateHash => ({
  X: rX(),
  Y: rY(),
  Z: rZ(),
  B: rB()
});
