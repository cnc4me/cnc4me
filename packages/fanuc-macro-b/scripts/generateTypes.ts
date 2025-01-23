import { MacroParser } from "../src";
import { ChevrotainGenerator } from "../src/lib/ChevrotainGenerator";
import { joinCwd, VISITOR_INTERFACE_NAME, writeFile } from "./common";

const parser = new MacroParser();
const generator = new ChevrotainGenerator(parser);

const outfile = joinCwd("src", "types", "fanuc.ts");
const types = generator.getCstDts({
  visitorInterfaceName: VISITOR_INTERFACE_NAME
});

writeFile(outfile, types);
