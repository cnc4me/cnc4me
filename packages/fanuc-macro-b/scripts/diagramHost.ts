import { MacroParser } from "../src";
import { createDiagramServer } from "./common";

const HOST = process.env["HOST"] ?? "localhost";
const PORT = process.env["PORT"] ?? 3240;

const parser = new MacroParser();
const server = createDiagramServer(parser);

server.on("listening", () => {
  console.log(`Diagram Host Listening on ${HOST}:${PORT}`);
  console.log(`\nView a State Diagram of the Runtime's Execution Flow.`);
  console.log(`http://${HOST}:${PORT}/fsm`);
  console.log(`\nView a Railroad Diagram of the Parser's Grammar.`);
  console.log(`http://${HOST}:${PORT}/lang`);
});

server.listen({ hostname: HOST, port: PORT });
