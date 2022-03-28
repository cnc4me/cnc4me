import { MacroMemory } from "../src/lib";

const mem = new MacroMemory();

mem.setToolLength(512, 2.3846);
mem.setToolLengthComp(61, 0.01);
mem.setToolDiameter(5, 0.75);
mem.setToolDiameterComp(1, 0.002);
mem.setWorkOffset(54, {
  X: -12.1623,
  Y: 22.1623,
  Z: 5.2315,
  B: 90
});

console.log("\n\n================== Memory =====================");

const values = mem.toArray();

console.log(values);
