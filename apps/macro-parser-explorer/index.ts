import { createServer } from "@cnc4me/chevrotain-live";
import { MacroParser } from "@cnc4me/fanuc-macro-b/dist"; // @TODO WHY NEED DIST?

const parser = new MacroParser();
const server = createServer(parser);

void (async () => {
  try {
    await server.listen({ port: 3240 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
