import type { Callback, ITransition } from "typescript-fsm";
import type { Events, States } from "../fsm/MacroRuntimeFSM";

// Function to generate the Mermaid.js diagram code
export function generateMermaidDiagram(
  transitions: ITransition<States, Events, Callback>[],
  title?: string,
) {
  const diagram: string[] = [];
  if (title) {
    diagram.push("---");
    diagram.push(`title: ${title}`);
    diagram.push("---");
  }
  diagram.push("stateDiagram-v2");
  diagram.push(`  [*] --> ${String(transitions[0].fromState)}`);

  transitions.forEach(({ event, fromState, toState }) => {
    const from = String(fromState);
    const to = String(toState);
    const evt = String(event);
    diagram.push(`  ${from} --> ${to}: ${evt}`);
  });

  const last = transitions[transitions.length - 1];
  diagram.push(`  ${String(last.toState)} --> [*]`);

  return diagram.join("\n");
}
