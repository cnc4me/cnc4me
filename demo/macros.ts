import { F } from "../src/MacroConstants";
import MacroVariableStore from "../src/memory/MacroVariables";

const locals = MacroVariableStore.createLocalSet();
const probing = new MacroVariableStore(100, 199);

locals.write(2, 1.2314);
locals.write(9, 6.3723);

const feed = locals.read(F);

console.log(feed);
