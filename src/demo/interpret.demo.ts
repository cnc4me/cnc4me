import interpret from "../interpreter/interpret";
import { sample1 } from "./samples";

const result = interpret(sample1);

console.log(result);

result.parseErrors.forEach(e => console.log(e));
