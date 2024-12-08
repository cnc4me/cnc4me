/* eslint-disable @typescript-eslint/require-await */
import { createActor } from "xstate";

import { AxisFSM } from "../src/lib/MachineTool";

async function slowly(functions: (() => Promise<void>)[], delay: number) {
  for (const func of functions) {
    await new Promise(resolve => {
      void func().then(() => setTimeout(resolve, delay));
    });
  }
}

const axis = createActor(AxisFSM, {
  input: { label: "X", limits: 100 }
});

// console.dir(machine, { depth: 1 });

axis.subscribe(snapshot => {
  // console.dir(snapshot.context, { depth: 1 });
  console.log("\n============", snapshot.value, "============");
  console.log("target position:", snapshot.context.pTarget);
  console.log("current position:", snapshot.context.pCurrent);
});

axis.start();

void slowly(
  [
    async () => axis.send({ type: "travel", to: 1 }),
    async () => axis.send({ type: "travel", to: 14.25 }),
    async () => axis.send({ type: "travel", to: -2 }),
    async () => axis.send({ type: "travel", to: 7.55543 }),
    async () => axis.send({ type: "travel", to: 1.2 })
  ],
  2
);

// machine.send({ type: "reset" });
