import interpret from "../interpreter/interpret";
import { sample1 } from "./samples";

const result = interpret(sample1);

if (result.parseErrors.length == 0) {
  const programTitle = result.lexResult.groups.comments[0].image;

  console.log(`Program Title ${programTitle}`);
} else {
  result.parseErrors.forEach(e => console.log(e));
}
