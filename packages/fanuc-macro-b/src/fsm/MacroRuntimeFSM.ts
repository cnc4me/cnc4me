import Emittery from "emittery";
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
type StateName = keyof typeof States;

export enum Events {
  start = "start",
  stop = "stop",
  pause = "pause",
  resume = "resume",
  reset = "reset",
  finish = "finish",
  error = "error"
}

const $d = Debuggers.Runtime;
const $f = $d.extend("fsm");
const $e = $f.extend("event");
const $c = $f.extend("callback");
const $s = $f.extend("state");

export class MacroRuntimeFSM extends StateMachine<States, Events> {
  static STATES = States;
  static EVENTS = Events;

  callbacks: StateHandlerMap<StateName> = {
    onStopped: () => {},
    onRunning: () => {},
    onPaused: () => {},
    onError: () => {},
    onFinished: () => {}
  };

  #events = new Emittery();

  constructor(callbacks?: Partial<StateHandlerMap<StateName>>) {
    super(States.stopped);

    const s = States;
    const e = Events;

    /* eslint-disable prettier/prettier */
    const transitions = [
      // fromState  event     toState      callback
      t(s.stopped, e.start,  s.running,  () => this.callbacks.onRunning()),
      t(s.error,   e.reset,  s.stopped,  () => this.callbacks.onStopped()),
      t(s.running, e.pause,  s.paused,   () => this.callbacks.onPaused()),
      t(s.paused,  e.resume, s.running,  () => this.callbacks.onRunning()),
      t(s.running, e.stop,   s.stopped,  () => this.callbacks.onStopped()),
      t(s.running, e.error,  s.error,    () => this.callbacks.onError()),
      t(s.running, e.finish, s.finished, () => this.callbacks.onFinished())
    ];
    /* eslint-enable prettier/prettier */

    this.addTransitions(transitions);

    if (callbacks) {
      for (const onState of Object.keys(callbacks)) {
        const event = onState as CallbackName<StateName>;
        const callback = callbacks[event] as ActualCallback;
        const stateName = onState.replace(/^on/, "").toLowerCase() as StateName;
        $f("registering", onState, "callback");
        this.on(stateName, callback);
      }
    }
  }

  getTransitions() {
    return this.transitions;
  }

  async trigger(event: keyof typeof Events) {
    $e(event);
    return await this.dispatch(Events[event]);
  }

  on<T extends StateName>(stateName: T, callback: NonNullable<Callback>) {
    const state = stateName.charAt(0).toUpperCase() + stateName.slice(1);
    const callbackName = `on${state}` as CallbackName<T>;
    this.callbacks[callbackName] = async () => {
      $c(callbackName);
      await callback();
      $s(this._current);
    };
  }
}

type ActualCallback = NonNullable<Callback>;

type CallbackName<T extends string> = `on${Capitalize<T>}`;

type StateHandlerMap<T extends string> = Record<
  CallbackName<T>,
  ActualCallback
>;
