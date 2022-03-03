import type { GenerateDtsOptions } from "chevrotain";
import type { SourceFile } from "typescript";

export interface CstDtsGeneratorOptions extends GenerateDtsOptions {
  // parser: CstParser;
  outFile: string;
}

export interface CstDtsGeneratorResult {
  content: string;
  node: SourceFile;
  options: CstDtsGeneratorOptions;
}
