/* eslint-disable @typescript-eslint/no-misused-promises */
import { MacroRuntimeFSM } from "../src";

const fsm = new MacroRuntimeFSM({
  onError: () => {
    console.log("Oh noes! an Errorror!");
  },
  onStopped: () => {
    console.log("We stopped!");
  },
  onFinished: () => {
    console.log("ALL DONE!");
  },
  onRunning: () => {
    console.log("Wheeeeee");
  }
});

// Run It
void (async () => {
  await fsm.trigger("start");

  await fsm.trigger("stop");

  setTimeout(async () => {
    await fsm.trigger("start");

    setTimeout(async () => {
      await fsm.trigger("error");
    }, 1000);
  }, 2000);

  setTimeout(async () => {
    await fsm.trigger("reset");
  }, 5000);
})();
