import { SpindleFSM } from "../src";

const spindle = new SpindleFSM({
  rpm: {
    max: 5000,
    onExceedMaxRPM: "clamp"
  }
});

spindle.on("AT_TARGET_RPM", rpm => {
  console.log("At Speed!", rpm);
});

spindle.on("RPM_CHANGED", ({ current, target }) => {
  console.log("changing speeds..........");
  console.log("current", current);
  console.log("target", target);
});

spindle.on("FAULT", fault => {
  console.error(`[FAULT] ${fault}`);
});

void (async () => {
  spindle.simulation = false;

  await spindle.M3(6000);

  setTimeout(() => {
    void spindle.M5();
  }, 2000);
})();
