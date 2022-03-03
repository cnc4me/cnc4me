import { generateTsNode } from "../src";
import output from "./output";
import { parser } from "./parser";

const ast = generateTsNode(parser);

output("ast.json", JSON.stringify(ast, null, "  "));
