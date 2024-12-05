import { StateMachine, t } from "typescript-fsm";

import { Debuggers } from "../../utils";

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

const $d = Debuggers.Runtime;
const $f = $d.extend("fsm");
const $e = $f.extend("event");
const $c = $f.extend("callback");
const $s = $f.extend("state");

export class BaseMachine extends StateMachine<States, Events> {
  static STATES = States;
  static EVENTS = Events;

  callbacks: Record<StateHandlerName, ActualCallback> = {
    onStopped: () => {},
    onRunning: () => {},
    onPaused: () => {},
    onError: () => {},
    onFinished: () => {}
  };

  constructor() {
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
  }

  getTransitions() {
    return this.transitions;
  }

  trigger(event: keyof typeof Events) {
    $e(event);
    return this.dispatch(Events[event]);
  }

  on(state: StateName, callback: NonNullable<Callback>) {
    const theState = state.charAt(0).toUpperCase() + state.slice(1);
    const callbackName = `on${theState}` as StateHandlerName;
    this.callbacks[callbackName] = async () => {
      $c(callbackName);
      await callback();
      $s(this._current);
    };
  }
}

type StateName = keyof typeof States;
type ActualCallback = NonNullable<Callback>;
type StateHandlerName = `on${Capitalize<StateName>}`;
type StateHandlerMap = Record<StateHandlerName, NonNullable<Callback>>;
