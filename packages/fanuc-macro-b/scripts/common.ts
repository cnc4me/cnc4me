import { createServer } from "node:http";

import { createSyntaxDiagramsCode } from "chevrotain";
import { writeFileSync } from "fs";
import path from "path";

import { MacroRuntimeFSM } from "../src";
import { generateMermaidDiagram } from "../src/utils/mermaid";

import type { BaseParser } from "chevrotain";

export const fsm = new MacroRuntimeFSM();

export const VISITOR_INTERFACE_NAME = "MacroNodeVisitor";

export function joinCwd(...parts: string[]) {
  return path.join(process.cwd(), ...parts);
}

export function writeFile(out: string, data: string) {
  writeFileSync(out, data);
  console.log(
    `Wrote to file \x1b[33m${out.replace(process.cwd(), ".")}\x1b[0m`
  );
}

export function createDiagramServer(parser: BaseParser) {
  const server = createServer((req, res) => {
    if (req.method === "GET") {
      if (req.url === "/lang") {
        console.info(`[${new Date().toISOString()}] Generating Parser Diagram`);
        const gast = parser.getSerializedGastProductions();
        const html = createSyntaxDiagramsCode(gast);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      }

      if (req.url === "/fsm") {
        console.info(
          `[${new Date().toISOString()}] Generating Runtime Diagram`
        );
        const mmdContent = generateMermaidDiagram(fsm.getTransitions());

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body class="d-flex justify-content-center bg-secondary-subtle">
              <div class="d-flex flex-column">
                <h1 class="my-5">Macro Runtime State</h1>
                <div class="d-flex justify-content-center">
                  <pre class="mermaid shadow-lg p-3 rounded-3 bg-white">
                      ${mmdContent}
                  </pre>
                </div>
              </div>
              <script type="module">
                import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
                mermaid.initialize({ startOnLoad: true });
              </script>
            </body>
          </html>`);
      }
    }
  });

  server.on("error", err => console.error(err));

  return server;
}
