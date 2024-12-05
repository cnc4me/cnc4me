import { SpindleFSM } from "../src";

const spindle = new SpindleFSM({
  rpm: {
    max: 5000,
    onExceedMaxRPM: "clamp" // or "clamp"
  }
});

spindle.on("REACHED_TARGET_RPM", () => {
  console.log("[REACHED_TARGET_RPM] At Speed!");
});

spindle.on("RPM_CHANGED", ({ current, target }) => {
  console.log("changing speeds..........");
  console.log("current", current);
  console.log("target", target);
});

spindle.on("FAULT", fault => {
  console.log(`[FAULT] ${fault}`);
});

void (async () => {
  spindle.simulation = false;
  await spindle.M3(6000);
  console.log(spindle.rpms);
  setTimeout(() => {
    void spindle.M5().then(() => {
      console.log(spindle.rpms);
    });
  }, 2000);
})();
