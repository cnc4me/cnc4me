import interpret from "./src/interpreter/interpreter";
import { sample1 } from "./src/samples";

const result = interpret(sample1);

console.log(result);

result.parseErrors.forEach(e => console.log(e));
