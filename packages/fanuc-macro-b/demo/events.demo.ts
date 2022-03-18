import { interpreter } from "../src/lib";
import { Events } from "../src/lib/MacroInterpreter";
import { analyze } from "../src/utils";

const code = `
#1=10
#2=#1*5`;

interpreter.events.on(Events.MACRO_REGISTER_UPDATE, a => {
  console.log(a);
});

const result = analyze(code);

console.log(result);
