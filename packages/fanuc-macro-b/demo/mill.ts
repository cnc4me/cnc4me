import { CncMachine } from "../src/lib/MachineTool";

const machine = new CncMachine({
  limits: { X: 1200, Y: 3000, Z: [-1200, 200] }
});

machine.on("MOTION_COMPLETE", position => {
  console.log(position);
});

// machine.setHome("X", 20);
// machine.setHome("X", ({ min, max }) => max - 20);

void (async () => {
  const positions = [
    { X: 41.23 }, //
    { Y: 1 },
    { Y: -1 },
    { Y: 1 }
  ];

  for (const p of positions) {
    await machine.G0(p);
  }

  const state = machine.getStats();

  console.log(state);
})();
