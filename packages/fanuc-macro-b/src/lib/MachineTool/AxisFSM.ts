import Emittery from "emittery";
import { Callback, StateMachine, t } from "typescript-fsm";

import { Debuggers } from "../../utils";
import { parseLimits } from "./parseLimits";

import type { Debugger } from "debug";

enum States {
  Idle = "Idle",
  Fault = "Fault",
  Traveling = "Traveling"
}

enum Events {
  Move = "Move",
  Reset = "Reset",
  MoveComplete = "MoveComplete",
  FaultOccurred = "FaultOccurred"
}

type EmittedEvents = {
  FAULT: string;
  RESET: undefined;
  MOTION_COMPLETE: number;
  TRAVELING: Record<"to" | "from", number> & {
    type: MotionType;
  };
};

type StringCallback = (msg: string) => void;
type TravelingEvent = (args: MotionType) => Promise<void>;
type Callbacks = Callback | StringCallback | TravelingEvent;
interface ICallbacks extends Record<Events, Callbacks> {
  [Events.Move]: TravelingEvent;
  [Events.FaultOccurred]: StringCallback;
}

const $d = Debuggers.Main.extend("machine:axis");

export class AxisFSM extends StateMachine<States, Events, ICallbacks> {
  #debug: Debugger;
  #targetPosition: number;
  #currentPosition: number;
  #config: {
    label: AxisLabel;
    limits: AxisLimits;
    travelTimeout: number;
    throwOnFault: boolean;
  };

  readonly #events = new Emittery<EmittedEvents>();

  // Constructor
  constructor(config: {
    label: AxisLabel;
    limits: AxisLimitsInput;
    travelTimeout?: number;
    throwOnFault?: boolean;
  }) {
    super(States.Idle, [], {
      // This overrides console.error
      error: (msg: string) => void this.#events.emit("FAULT", msg)
    });
    this.#targetPosition = NaN;
    this.#currentPosition = NaN;
    this.#config = {
      label: config.label,
      limits: parseLimits(config.limits),
      travelTimeout: config?.travelTimeout ?? 250,
      throwOnFault: config?.throwOnFault ?? false
    };
    this.#debug = $d.extend(this.#config.label);
    this.#debug(`initializing`);
    this.#debug(this.#config);

    const s = States;
    const e = Events;

    /* eslint-disable prettier/prettier */
    this.addTransitions([
      // fromState     event         toState       callback
      t(s.Idle,       e.Move,          s.Traveling, this.#onMove),
      t(s.Traveling,  e.Move,          s.Traveling, this.#onMove),
      t(s.Traveling,  e.MoveComplete,  s.Idle,      this.#onMoveComplete),
      t(s.Idle,       e.FaultOccurred, s.Fault,     this.#onFault),
      t(s.Traveling,  e.FaultOccurred, s.Fault,     this.#onFault),
      t(s.Traveling,  e.Reset,         s.Idle,      this.#onReset),
      t(s.Fault,      e.Reset,         s.Idle,      this.#onReset),
    ]);
    /* eslint-enable prettier/prettier */
    this.#logState();
    // end-constructor
  }

  get limits() {
    return this.#config.limits;
  }

  get position() {
    return this.#currentPosition;
  }

  on<T extends keyof EmittedEvents>(
    event: T,
    cb: (eventData: EmittedEvents[T]) => void
  ) {
    return this.#events.on(event, cb);
  }

  /**
   * Generic state testing method
   */
  is(state: keyof typeof States): boolean {
    return this.getState() === States[state];
  }

  isValidPosition(position: number) {
    return (
      position > this.#config.limits.min && position < this.#config.limits.max
    );
  }

  async reset() {
    if (this.is("Idle")) {
      return this.#onReset();
    } else {
      return await this.dispatch(Events.Reset);
    }
  }

  async moveTo(position: number, command: MotionType = "G0") {
    return await this[command](position);
  }

  /**
   * Rapid Move
   */
  async G0(position: number) {
    this.#targetPosition = position;
    this.#debug({ command: "G0", position });
    return await this.dispatch(Events.Move, "G0");
  }

  /**
   * Feed Move
   */
  async G1(position: number) {
    this.#targetPosition = position;
    this.#debug({ command: "G1", position });
    return await this.dispatch(Events.Move, "G1");
  }

  #onReset() {
    this.#debug(`resetting`);
    this.#targetPosition = NaN;
    this.#currentPosition = NaN;
    this.#debug(`positions cleared`);
  }

  async #onMove(motionType: MotionType) {
    this.#logState();
    // this.#debug("Target", this.#targetPosition);
    try {
      void this.#events.emit("TRAVELING", {
        type: motionType,
        to: this.#targetPosition,
        from: this.#currentPosition
      });
      await dwell(this.#config.travelTimeout);
      await this.dispatch(Events.MoveComplete);
    } catch (err) {
      if (this.#config.throwOnFault) {
        throw err;
      }
    }
  }

  #onMoveComplete() {
    this.#currentPosition = this.#targetPosition;
    this.#targetPosition = NaN;
    this.#debug("motion complete");
    this.#debug({ currentPosition: this.#currentPosition });
    this.#logState();
    void this.#events.emit("MOTION_COMPLETE", this.#currentPosition);
  }

  #onFault(message: string) {
    this.#logState();
    this.#debug("fault occured", message);
    void this.#events.emit("FAULT", message);
  }

  async #validateTargetPosition(position: number) {
    if (position > this.#config.limits.max) {
      return await this.#handleError("Target position exceeds axis limit (+)");
    }
    if (position < this.#config.limits.max) {
      return await this.#handleError("Target position exceeds axis limit (-)");
    }
    return position;
  }

  async #handleError(error: string) {
    if (this.#config.throwOnFault) {
      throw new Error(error);
    } else {
      await this.dispatch(Events.FaultOccurred, error);
    }
  }

  #logState() {
    this.#debug(`State:`, this.getState());
  }
}

async function dwell(timeout: number) {
  return await new Promise(resolve => setTimeout(resolve, timeout));
}

type AxisLabel = "X" | "Y" | "Z";
export type MotionType = "G0" | "G1";
export type AxisLimits = Record<"min" | "max", number>;
export type AxisLimitsInput =
  | number
  | [negative: number, positive: number]
  | AxisLimits;
