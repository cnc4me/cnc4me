import { CstParser, generateCstDts } from "chevrotain";
import { promises, writeFileSync } from "fs";
import prettier from "prettier";

const writeFileAsync = promises.writeFile;

function _generateTypes(parser: CstParser): string {
  const productions = parser.getGAstProductions();
  const contents = generateCstDts(productions);

  return prettier.format(contents, { parser: "typescript" });
}

const generateTypes = (parser: CstParser, outputPath: string) => {
  return writeFileAsync(outputPath, _generateTypes(parser));
};

generateTypes.sync = (parser: CstParser, outputPath: string) => {
  return writeFileSync(outputPath, _generateTypes(parser));
};

export default generateTypes;
