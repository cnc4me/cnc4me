import { CstParser, generateCstDts } from "chevrotain";
import { promises, writeFileSync } from "fs";

function _generateTypes(parser: CstParser): string {
  const productions = parser.getGAstProductions();
  const contents = generateCstDts(productions);

  return contents;
}

export async function generateTypesAsync(
  parser: CstParser,
  outputPath: string
) {
  return promises.writeFile(outputPath, _generateTypes(parser));
}

export function generateTypes(parser: CstParser, outputPath: string) {
  return writeFileSync(outputPath, _generateTypes(parser));
}
