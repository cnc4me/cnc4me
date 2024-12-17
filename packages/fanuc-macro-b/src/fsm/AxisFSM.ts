import Emittery from "emittery";
import { Callback, StateMachine, t } from "typescript-fsm";

import { Debuggers } from "../utils";

import type {
  AxisFsmEvents,
  AxisLabel,
  AxisLimits,
  AxisLimitsInput,
  FsmCallback,
  MotionType
} from "./fsm.types";
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

interface AxisFsmConfig {
  limits: AxisLimitsInput;
  travelTimeout?: number;
  throwOnFault?: boolean;
}

interface ICallbacks extends Record<Events, FsmCallback<MotionType>> {
  [Events.Reset]: Callback;
  [Events.MoveComplete]: Callback;
  [Events.FaultOccurred]: (message: string) => void;
  [Events.Move]: (command: MotionType) => Promise<void>;
}

const $d = Debuggers.Main.extend("machine:axis");

// @ts-expect-error The callbacks work but TS has some issue...
export class AxisFSM extends StateMachine<States, Events, ICallbacks> {
  #targetPosition: number;
  #currentPosition: number;
  #config: {
    label: AxisLabel;
    limits: AxisLimits;
    travelTimeout: number;
    throwOnFault: boolean;
  };

  readonly #debug: Debugger;
  readonly #events = new Emittery<AxisFsmEvents>();

  // Constructor
  constructor(label: AxisLabel, config: AxisFsmConfig) {
    super(States.Idle, [], {
      // This overrides console.error
      error: (msg: string) => void this.#events.emit("FAULT", msg)
    });
    this.#targetPosition = NaN;
    this.#currentPosition = NaN;
    this.#config = {
      label,
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
      t(s.Idle,       e.Move,          s.Traveling, this.#onTraveling),
      t(s.Traveling,  e.Move,          s.Traveling, this.#onTraveling),
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

  on<T extends keyof AxisFsmEvents>(
    event: T,
    cb: (eventData: AxisFsmEvents[T]) => void
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

  async #onTraveling(motionType: MotionType) {
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

//
// Helper Functions
//
async function dwell(timeout: number) {
  return await new Promise(resolve => setTimeout(resolve, timeout));
}

function parseLimits(limits: AxisLimitsInput): AxisLimits {
  if (typeof limits === "number") {
    return { min: -Math.abs(limits), max: Math.abs(limits) };
  }

  if (Array.isArray(limits)) {
    const [min, max] = limits;
    if (min === max) {
      throw new Error(`(+) & (-) limits cannot be equal`);
    }
    if (min > max) {
      throw new Error(`(-) limit cannot be greater than the (+) limit`);
    }
    return { min, max };
  }

  const { min, max } = limits;
  if (min === max) {
    throw new Error(`(+) & (-) limits cannot be equal`);
  }
  if (min > max) {
    throw new Error(`(-) limit cannot be greater than the (+) limit`);
  }
  return limits;
}
