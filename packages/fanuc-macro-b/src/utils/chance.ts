import { Chance } from "chance";

const chance = Chance();

export function smallRand() {
  return chance.floating({ fixed: 4, min: -1, max: 1 });
}

export function bigRand() {
  return chance.floating({ fixed: 4, min: -10, max: 10 });
}
