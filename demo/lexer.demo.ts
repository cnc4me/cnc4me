import { lex } from "../src/utils";
import { sample1 } from "./samples";

const result = lex(sample1);
const tokens = result.tokens.map(t => [t.image, t.tokenType.name]);

console.log(tokens);

if (result.errors.length > 0) {
  const errors = result.errors.map(e => e.message);
  console.log(errors);
}
