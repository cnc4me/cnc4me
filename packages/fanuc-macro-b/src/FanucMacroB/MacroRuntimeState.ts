import { StateMachine, t } from "typescript-fsm";

import { Debuggers } from "../utils";

import type { Callback } from "typescript-fsm";

export enum States {
  finished = "finished",
  error = "error",
  stopped = "stopped",
  paused = "paused",
  running = "running"
}

export enum Events {
  start = "start",
  stop = "stop",
  pause = "pause",
  resume = "resume",
  reset = "reset",
  finish = "finish",
  error = "error"
}

const debug = Debuggers.Runtime.extend("fsm");

const noop: Callback = () => undefined;

const callbacks: Record<keyof typeof States, NonNullable<Callback>> = {
  stopped: noop,
  running: noop,
  paused: noop,
  finished: noop,
  error: noop
};

// t(fromState, event, toState, callback)
export const transitions = [
  t(States.stopped, Events.start, States.running, () => callbacks.running()),
  t(States.error, Events.reset, States.stopped, () => callbacks.stopped()),
  t(States.running, Events.pause, States.paused, () => callbacks.paused()),
  t(States.paused, Events.resume, States.running, () => callbacks.running()),
  t(States.running, Events.stop, States.stopped, () => callbacks.stopped()),
  t(States.running, Events.error, States.error, () => callbacks.error()),
  t(States.running, Events.finish, States.finished, () => callbacks.finished())
];

// initialize the state machine
export const MacroRuntimeState: StateMachine<States, Events> = new StateMachine<
  States,
  Events
>(
  States.stopped, // initial state
  transitions // array of transitions
);

export function createActor(
  machine: typeof MacroRuntimeState
): StateMachineActor {
  return Object.assign(machine, {
    trigger(event: keyof typeof Events) {
      debug("dispatching event", event);
      debug(event);
      return machine.dispatch(Events[event]);
    },
    on(state: keyof typeof States, cb: NonNullable<Callback>) {
      debug("entered state", state);
      debug(state);
      callbacks[state] = cb;
    }
  });
}

type StateMachineActor = StateMachine<States, Events> & {
  trigger(event: keyof typeof Events): Promise<void>;
  on(state: keyof typeof States, cb: Callback): void;
};
