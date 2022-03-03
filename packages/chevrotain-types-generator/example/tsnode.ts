import { generateTypescriptNode } from "../src";
import output from "./output";
import { parser } from "./parser/json-parser";

const ast = generateTypescriptNode(parser);

output("ast.json", JSON.stringify(ast, null, "  "));
