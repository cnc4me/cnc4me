import { createSyntaxDiagramsCode } from "chevrotain";
import Fastify from "fastify";

import type { BaseParser } from "chevrotain";

const server = Fastify({ logger: true });

export function createServer(parser: BaseParser) {
  const gast = parser.getSerializedGastProductions();

  server.get("/", (_, reply) => {
    const html = createSyntaxDiagramsCode(gast);
    reply.type("text/html").send(html);
  });

  return  server;
}
