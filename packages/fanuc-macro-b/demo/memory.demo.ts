import { MacroMemory } from "../src/lib";

const mem = new MacroMemory();

mem.setToolLength(15, 2.3846);

mem.setToolLengthComp(61, 0.01);

mem.setToolDiameter(3, 0.75);

mem.setToolDiameterComp(111, 0.002);

mem.setWorkOffset(54, {
  X: -11.7285,
  Y: 32.51347,
  Z: 15.99754,
  B: 0
});

mem.setWorkOffset(55, {
  X: -12.1623,
  Y: 22.1623,
  Z: 5.2315,
  B: 90
});

console.log("\n\n================== Memory =====================");

const values = mem.toArray();

console.log(values);
