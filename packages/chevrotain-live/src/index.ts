import { MacroParser } from "@cnc4me/fanuc-macro-b";

import { createServer } from "./server.js";

const parser = new MacroParser();

const server = createServer(parser);

void server.start(3240);
