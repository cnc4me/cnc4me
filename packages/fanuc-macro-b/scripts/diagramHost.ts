import { createServer } from "node:http";

import { createSyntaxDiagramsCode } from "chevrotain";

import { MacroParser } from "../src";

import type { BaseParser } from "chevrotain";

serveParserDiagram(new MacroParser(), 3240);

function serveParserDiagram(parser: BaseParser, port: number) {
  const server = createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
      console.info(`[${new Date().toISOString()}] Generating Parser Diagram`);
      const gast = parser.getSerializedGastProductions();
      const html = createSyntaxDiagramsCode(gast);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    }
  });

  server.on("error", err => console.error(err));

  server.on("listening", () => {
    console.log(`Parser Diagram listening at http://127.0.0.1:${port}`);
  });

  return server.listen(port);
}
