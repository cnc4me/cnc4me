import {
  createSyntaxDiagramsCode,
  CstParser,
  generateCstDts,
  ICreateSyntaxDiagramsConfig
} from "chevrotain";
import { writeFileSync } from "fs";
import path from "path";
import ts from "typescript";

import { CstDtsGeneratorOptions } from "./types";

export const DEFAULT_FILENAME = "__generated__.d.ts";

export const GENERATOR_DEFAULTS: CstDtsGeneratorOptions = {
  includeVisitorInterface: true,
  visitorInterfaceName: "ICstNodeVisitor",
  outFile: path.join(process.cwd(), DEFAULT_FILENAME)
};

export function generateProductions(parser: CstParser) {
  return parser.getGAstProductions();
}

export function generateSerializedProductions(parser: CstParser) {
  return parser.getSerializedGastProductions();
}

export function generateTsNode(parser: CstParser, outFile = DEFAULT_FILENAME) {
  return ts.createSourceFile(outFile, generateTypes(parser), ts.ScriptTarget.Latest);
}

/**
 * Generate TypeScript types from a Chevrotain Parser
 *
 * Set `outFile` to a file location to write the types to disk. If missing,
 * then the function will return the file content as a string.
 */
export function generateTypes(parser: CstParser, args?: CstDtsGeneratorOptions): string {
  const productions = generateProductions(parser);
  const options = { ...GENERATOR_DEFAULTS, ...args };
  const content = generateCstDts(productions, options);
  const filename = options.outFile.split(path.sep).pop();

  if (options.outFile && filename !== DEFAULT_FILENAME) {
    writeFileSync(options.outFile, content);
  }

  return content;
}

/**
 * Generate HTML of a syntax diagram of a parsers' grammar
 */
export function generateHtml(parser: CstParser, config?: ICreateSyntaxDiagramsConfig): string {
  const options = { ...GENERATOR_DEFAULTS, ...config };

  return createSyntaxDiagramsCode(generateSerializedProductions(parser), options);
}
