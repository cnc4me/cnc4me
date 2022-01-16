import interpret from "../interpreter/interpret";
import { sample1 } from "./samples";

const result = interpret(sample1);

// console.log(result.lexResult.tokens);

result.parseErrors.forEach(e => console.log(e));
