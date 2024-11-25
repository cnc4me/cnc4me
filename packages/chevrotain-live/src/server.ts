import { createSyntaxDiagramsCode } from "chevrotain";
import Fastify from "fastify";

import type { BaseParser } from "chevrotain";

const fastify = Fastify({ logger: true });

export function createServer(parser: BaseParser) {
  const gast = parser.getSerializedGastProductions();

  fastify.get("/", () => createSyntaxDiagramsCode(gast));

  const start = async (port: number) => {
    try {
      await fastify.listen({ port });
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

  return { fastify, start };
}
