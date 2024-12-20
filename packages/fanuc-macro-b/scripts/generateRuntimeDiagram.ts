import { generateMermaidDiagram } from "../src/utils/mermaid";
import { fsm, joinCwd, writeFile } from "./common";

const outfile = joinCwd("diagrams", "MarcoRuntimeState.mmd");
const content = generateMermaidDiagram(
  fsm.getTransitions(),
  "Fanuc Macro B - Runtime State"
);

writeFile(outfile, content);
