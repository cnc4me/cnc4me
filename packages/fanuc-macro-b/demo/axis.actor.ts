/* eslint-disable @typescript-eslint/require-await */
import { createActor } from "xstate";

import { AxisFSM } from "../src/lib/MachineTool/Axis.xstate";

async function slowly(functions: (() => Promise<void>)[], delay: number) {
  for (const func of functions) {
    await new Promise(resolve => {
      void func().then(() => setTimeout(resolve, delay));
    });
  }
}

const axis = createActor(AxisFSM, {
  input: { label: "X", limits: 1200 }
});

axis.on("overtravel", ({ message }) => {
  console.error(message);
});

axis.on("in_position", ({ position }) => {
  console.log("\tin_position at", position);
});

axis.on("in_motion", ({ from, to }) => {
  console.log("\tin_motion from", from, "to", to);
});

axis.subscribe(snapshot => {
  // console.dir(snapshot.context, { depth: 1 });
  console.log("\n============", snapshot.value, "============");
  console.log("target position:", snapshot.context.pTarget);
  console.log("current position:", snapshot.context.pCurrent);
});

axis.start();

void (async () => {
  const moves = [1, 2, 3, 4, 5];

  for (const position of moves) {
    axis.send({ type: "travel", to: position });
  }
})();
