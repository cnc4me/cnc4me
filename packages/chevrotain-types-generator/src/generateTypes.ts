import { CstParser, generateCstDts, GenerateDtsOptions } from "chevrotain";
import { writeFileSync } from "fs";

interface TypeGeneratorArgs extends GenerateDtsOptions {
  parser: CstParser;
  outFile?: string;
}

/**
 * Generate types for TypeScript from a Chevrotain Parser
 *
 *
 * Set `outFile` to a file location to write the types to disk. If missing,
 * then the function will return the file contents as a string.
 */
export function generateTypes(args: TypeGeneratorArgs): string {
  const productions = args.parser.getGAstProductions();

  const contents = generateCstDts(productions, {
    includeVisitorInterface: args?.includeVisitorInterface ?? true,
    visitorInterfaceName: args?.visitorInterfaceName ?? "ICstNodeVisitor"
  });

  if ("outFile" in args && typeof args.outFile === "string") {
    writeFileSync(args.outFile, contents);
  }

  return contents;
}
