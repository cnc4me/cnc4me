import { Utils } from "../src";
import { transitions } from "../src/FanucMacroB/MacroRuntimeState";
import { joinCwd, writeFile } from "./_helpers";

const outfile = joinCwd("diagrams", "MarcoRuntimeState.mmd");
const content = Utils.generateMermaidDiagram(
  transitions,
  "Fanuc Macro B - Runtime State"
);

writeFile(outfile, content);
