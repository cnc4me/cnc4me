import { MacroMemory } from "../src/lib";
import { G10Line } from "../src/lib/MacroMemory/G10Line";

const { error, result } = G10Line.parse("G10 L2 P1 X-5.1234 Y25.3252 Z1.2153 B270.");

if (error) {
  console.error(error);
} else {
  console.log(result);

  const mem = new MacroMemory();
  mem.g10(result);

  const values = mem.toArray();

  console.log(values);
}
