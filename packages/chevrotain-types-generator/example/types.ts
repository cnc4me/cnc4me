import { DEFAULT_FILENAME, generateTypes } from "../src";
import outputJson from "./output";
import { parser } from "./parser/json-parser";

const types = generateTypes(parser);

outputJson(DEFAULT_FILENAME, types);
