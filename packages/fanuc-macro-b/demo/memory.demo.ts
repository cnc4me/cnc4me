import { MacroMemory } from "../src/lib";

const mem = new MacroMemory();

console.log("\n\n================== Tool Offsets =====================");
mem.setToolLength(15, 2.3846);
mem.setToolLengthComp(15, 0.0016);
mem.setToolDiameter(15, 0.75);
mem.setToolDiameterComp(15, -0.0012);
console.log(mem.getToolOffsets(15));

console.log("\n\n================== Work Offsets =====================");
mem.setWorkOffset(54, {
  X: -11.7285,
  Y: 32.51347,
  Z: 15.99754,
  B: 0
});
console.log(mem.G54);

console.log("\n\n================== Offset Array =====================");
const values = mem.toArray();
console.log(values);
