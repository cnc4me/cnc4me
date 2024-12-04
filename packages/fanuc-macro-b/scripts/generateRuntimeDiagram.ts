import { Utils } from "../src";
import { fsm, joinCwd, writeFile } from "./common";

const outfile = joinCwd("diagrams", "MarcoRuntimeState.mmd");
const content = Utils.generateMermaidDiagram(
  fsm.getTransitions(),
  "Fanuc Macro B - Runtime State"
);

writeFile(outfile, content);
