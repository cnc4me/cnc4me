import { MacroRuntimeFSM } from "../src";

async function dwell(timeout = 1000) {
  return new Promise<void>(resolve => setTimeout(() => resolve(), timeout));
}

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
setTimeout(() => void fsm.trigger("reset"), 5000);

void Promise.resolve()
  .then(() => fsm.trigger("start"))
  .then(() => dwell())
  .then(() => fsm.trigger("stop"))
  .then(() => dwell())
  .then(() => fsm.trigger("start"))
  .then(() => dwell())
  .then(() => fsm.trigger("error"));
