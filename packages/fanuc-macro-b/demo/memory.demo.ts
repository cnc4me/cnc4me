import { MacroMemory } from "../src/lib";

const mem = new MacroMemory();

try {
  mem.evalG10("G10 L2 P1 X2.5 Y7.9584 Z1.2153 B90.");
  mem.evalG10("G10 L2 P2 X5. Y15.6354 Z6.8014 B-135.");
  mem.evalG10("G10 L2 P3 X7.5 Y21.5189 Z3.0025 B270.");

  const values = mem.toArray();

  console.log(values);
} catch (error) {
  console.error(error);
}
