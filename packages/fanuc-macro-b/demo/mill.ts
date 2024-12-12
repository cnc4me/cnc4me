import { CncMachine } from "../src/lib/MachineTool/CncMachine";

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
    [1, 2, 3],
    [5, -12, 0.555],
    [-21.21, 4.12, 2]
  ];

  for (const p of positions) {
    await machine.moveTo(p);
  }

  const state = machine.getStats();

  console.log(state);
})();
