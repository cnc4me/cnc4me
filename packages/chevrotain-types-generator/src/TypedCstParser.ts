import { CstParser } from "chevrotain";

import { generateTypes } from "./api";
import { CstDtsGeneratorOptions } from "./types";

/**
 * Small class to extend from to provide the method to generate types.
 */
export default class TypeGeneratingParser extends CstParser {
  public getDts = (options: CstDtsGeneratorOptions) => generateTypes(this, options);
}
