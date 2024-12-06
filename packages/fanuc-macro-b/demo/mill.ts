import { createActor } from "xstate";

import { VerticalMill } from "../src/lib/MachineTool";

const machine = createActor(VerticalMill);

// console.dir(machine, { depth: 1 });

// machine.subscribe(({ context }) => {
//   console.dir(context, { depth: 1 });
// });

machine.start();

machine.send({ type: "move_to_position" });

// machine.send({ type: "reset" });
