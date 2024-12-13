import Emittery from "emittery";
import { Callback, StateMachine, t } from "typescript-fsm";

import { Debuggers } from "../../utils";

import type { DeepPartial } from "../../types/generics";

interface SpindleFsmConfig {
  throwOnFault: boolean;
  rpm: {
    max: number;
    onExceedMaxRPM: "fault" | "clamp";
  };
  acceleration: {
    simulate: boolean;
    timeout: number;
  };
}

enum States {
  Idle = "Idle",
  Fault = "Fault",
  Running = "Running",
  Accelerating = "Accelerating",
  Decelerating = "Decelerating"
}

enum Events {
  Stop = "Stop",
  Forward = "Forward",
  Reverse = "Reverse",
  FaultOccurred = "FaultOccurred",
  ReachedTargetRPM = "ReachedTargetRPM"
}

/**
 * Rotation direction of the spindle
 * 1 = Forward (CW), 0 = Stopped, -1 = Reverse (CCW)
 */
enum Rotation {
  Forward = 1,
  Stopped = 0,
  Reverse = -1
}

const $d = Debuggers.Main.extend("machine:spindle");

// @ts-expect-error ICallbacks doesn't type correctly, but it still works
export class SpindleFSM extends StateMachine<States, Events, ICallbacks> {
  public handlers: Partial<EventHandlers> = {};

  #rpm: {
    current: number;
    target: number;
  };
  #direction: Rotation = 0;
  #config: SpindleFsmConfig;

  readonly #events = new Emittery<SpindleEventEmitter>();

  // Constructor
  constructor(config?: DeepPartial<SpindleFsmConfig>) {
    super(States.Idle, [], {
      // This overrides console.error
      error: (msg: string) => void this.#events.emit("FAULT", msg)
    });

    $d(`initializing`);
    this.#rpm = { current: 0, target: 0 };
    this.#config = {
      throwOnFault: config?.throwOnFault ?? false,
      rpm: {
        max: config?.rpm?.max ?? 8000,
        onExceedMaxRPM: config?.rpm?.onExceedMaxRPM ?? "fault"
      },
      acceleration: {
        simulate: config?.acceleration?.simulate ?? true,
        timeout: config?.acceleration?.timeout ?? 250
      }
    };

    $d(this.#config);
    if (this.#config.acceleration.simulate) {
      $d("acceleration simulation enabled");
      $d(`timeout set to ${this.#config.acceleration.timeout}ms`);
    }

    const s = States;
    const e = Events;

    /* eslint-disable prettier/prettier */
    this.addTransitions([
      //    fromState        event                toState          callback
      t(s.Idle,         e.Forward,          s.Accelerating, this.#onForward),
      t(s.Idle,         e.Reverse,          s.Accelerating, this.#onReverse),
      t(s.Running,      e.Forward,          s.Accelerating, this.#onForward), // Change speed or direction
      t(s.Running,      e.Reverse,          s.Accelerating, this.#onReverse), // Change speed or direction
      t(s.Accelerating, e.ReachedTargetRPM, s.Running,      this.#onReachedTargetRPM),
      t(s.Running,      e.Stop,             s.Decelerating, this.#stopping),
      t(s.Accelerating, e.Stop,             s.Decelerating, this.#stopping),
      t(s.Decelerating, e.ReachedTargetRPM, s.Idle,         this.#onStopped),
      t(s.Accelerating, e.FaultOccurred,    s.Fault,        this.#onFault),
      t(s.Running,      e.FaultOccurred,    s.Fault,        this.#onFault),
      t(s.Decelerating, e.FaultOccurred,    s.Fault,        this.#onFault),
      t(s.Idle,         e.FaultOccurred,    s.Fault,        this.#onFault),
    ]);
    $d("State", this.getState());
    // end-constructor
  }

  get on() {
    return this.#events.on.bind(this.#events);
  }

  get hasFault() {
    return this.getState() === States.Fault;
  }

  get direction(): string {
    return Rotation[this.#direction];
  }

  get rpms(): number {
    return this.#rpm.current;

  }

  get stats() {
    return {
      currentRPM: this.#rpm.current,
      directon: this.direction,
    }
  }

  get simulation() {
    return this.#config.acceleration.simulate ;
  }

  set simulation(state: boolean) {
    this.#config.acceleration.simulate = state;
  }

  /**
   * Generic state testing method
   */
  is(state: keyof typeof States): boolean {
    return this.getState() === States[state];
  }

  /**
   * Spindle Forward (CW)
   */
  async M3(targetRPM: number) {
    $d("Command:", "M3");
    await this.#setTargetRPM(targetRPM);
    await this.dispatch(Events.Forward).catch(err => {
      if (this.#config.throwOnFault) throw err;
    });
  }

  /**
   * Spindle Reverse (CCW)
   */
  async M4(targetRPM: number) {
    $d("Command:", "M4");
    await this.#setTargetRPM(targetRPM);
    await this.dispatch(Events.Reverse).catch(err => {
      if (this.#config.throwOnFault) throw err;
    });
  }

  /**
   * Spindle Stop
   */
  async M5() {
    $d("Command:", "M5");
    return this.dispatch(Events.Stop);
  }

  // Aliases
  stop = this.M5.bind(this);
  forward = this.M3.bind(this);
  reverse = this.M4.bind(this);

  async #onForward() {
    this.#logState();
    this.#direction = Rotation.Forward;
    $d(`forward to`, this.#rpm.target);
    await this.#simulateAcceleration();
    return this.dispatch(Events.ReachedTargetRPM);
  }

  async #onReverse() {
    this.#logState();
    this.#direction = Rotation.Reverse;
    $d(`reverse to`, this.#rpm.target);
    await this.#simulateAcceleration();
    return this.dispatch(Events.ReachedTargetRPM);
  }

  #onReachedTargetRPM() {
    this.#rpm.current = this.#rpm.target;
    $d(`target reached: ${this.rpms} RPMs`);
    $d(`direction:`, this.direction);
    this.#logState();
    void this.#events.emit("AT_TARGET_RPM", this.rpms);
    // State transitions to Running
  }

  async #stopping() {
    this.#rpm.target = 0;
    $d(`deccelerating from`, this.direction, "to", 0);
    await this.#simulateDeceleration();
    this.#rpm.current = 0;
    return this.dispatch(Events.ReachedTargetRPM);
  }

  #onStopped() {
    this.#direction = Rotation.Stopped;
    this.#onReachedTargetRPM();
    // State transitions back to Idle
  }

  #onFault(fault: string) {
    $d.extend("fault")(fault);
    void this.#events.emit("FAULT", fault);
  }


  async #setTargetRPM(targetRPM: number) {
    $d(targetRPM, "RPM commanded");
    if (targetRPM < this.#config.rpm.max) {
      this.#rpm.target = targetRPM;
      $d(this.#rpm.target, "target set")
      return;
    }
    if (this.#config.rpm.onExceedMaxRPM === "fault") {
      await this.dispatch(
        Events.FaultOccurred,
        "Commanded RPM exceeds maximum RPM"
      );
    } else {
      this.#rpm.target = this.#config.rpm.max;
      $d(this.#config.rpm.max, "target clamped");
    }
    void this.#events.emit("RPM_CHANGED", {
      current: this.rpms,
      target: this.#rpm.target
    })
  }

  async #simulateAcceleration() {
    if (this.#config.acceleration.simulate) {
      $d(`simulating acceleration`);
      await this.#dwell();
      $d("target RPM reached")
    }
  }

  async #simulateDeceleration() {
    if (this.#config.acceleration.simulate) {
      $d(`simulating deceleration`);
      await this.#dwell();
      $d("target RPM reached")
    }
  }

  async #dwell() {
    return await new Promise(resolve => {
      setTimeout(resolve, this.#config.acceleration.timeout);
    });
  }

  #logState() {
    $d(`state:`, this.getState());
  }
}

type StringCallback = (arg: string) => void;
type NumberCallback = (arg: number) => void;

type EventHandlers = {
  onReachedTargetRPM(): void;
};

type SpindleEventEmitter = {
  M3: undefined;
  M4: undefined;
  M5: undefined;
  FAULT: string;
  AT_TARGET_RPM: number;
  RPM_CHANGED: {
    target: number;
    current: number;
  };
};

interface ICallbacks
  extends Record<Events, Callback | NumberCallback | StringCallback> {
  [Events.FaultOccurred]: (fault: string) => void;
}
