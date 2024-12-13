/* eslint-disable @typescript-eslint/require-await */
import { AxisFSM } from "../src/lib/MachineTool/AxisFSM";

const axis = new AxisFSM({
  label: "X",
  limits: 1200,
  travelTimeout: 0
});

axis.on("FAULT", data => {
  console.log(data);
});

axis.on("TRAVELING", ({ type, to, from }) => {
  console.log(type);
  console.log(to);
  console.log(from);
});

axis.on("MOTION_COMPLETE", position => {
  console.log("position!", position);
});

void (async () => {
  const moves = [1, 2, 3, 4, 5];

  for (const position of moves) {
    await axis.G0(position);
  }

  await axis.reset();
})();
