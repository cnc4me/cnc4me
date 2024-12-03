/* eslint-disable @typescript-eslint/no-misused-promises */
import { createActor, MacroRuntimeState } from "../src";

const actor = createActor(MacroRuntimeState);

actor.on("running", () => {
  console.log("Wheeeeee");
});

actor.on("stopped", () => {
  console.log("PAUSE!");
});

actor.on("error", () => {
  console.log("Oh noes! an errorrrrrrrrrrrr!");
});

actor.on("finished", () => {
  console.log("ALL DONE!");
});

void (async () => {
  await actor.trigger("start");

  await actor.trigger("stop");

  setTimeout(async () => {
    await actor.trigger("start");

    setTimeout(async () => {
      await actor.trigger("error");
      console.log("fsm.isFinal() => ", MacroRuntimeState.isFinal());
    }, 1000);
  }, 2000);

  setTimeout(async () => {
    await actor.trigger("reset");
  }, 5000);
})();
