import Emittery from "emittery";

import { Debuggers } from "../../utils";
import {
  AxisFSM,
  type AxisLimits,
  type AxisLimitsInput,
  type MotionType
} from "./AxisFSM";
import { parseLimits } from "./parseLimits";
import { SpindleFSM } from "./SpindleFSM";

type EmittedEvents = {
  FAULT: string;
  RESET: undefined;
  MOTION_COMPLETE: Record<"X" | "Y" | "Z", number>;
  TRAVELING: Record<"to" | "from", number> & {
    type: MotionType;
  };
};

export class CncMachine {
  #config: {
    home: {
      X: number;
      Y: number;
      Z: number;
    };
    throwOnFault: boolean;
  };

  axes: {
    X: AxisFSM;
    Y: AxisFSM;
    Z: AxisFSM;
  };
  spindle: SpindleFSM;

  readonly #debug = Debuggers.Main.extend("machine");
  readonly #events = new Emittery<EmittedEvents>();

  // Constructor
  constructor(
    config?: Partial<{
      home: Partial<Record<"X" | "Y" | "Z", number>>;
      limits: Partial<Record<"X" | "Y" | "Z", AxisLimitsInput>>;
      throwOnFault: boolean;
      axisTravelTimeout: number;
      spindle: ConstructorParameters<typeof SpindleFSM>[0];
    }>
  ) {
    const travelTimeout = config?.axisTravelTimeout ?? 200;
    this.#debug(`initializing`);
    this.spindle = new SpindleFSM(config?.spindle);
    this.axes = {
      X: new AxisFSM({
        label: "X",
        limits: parseLimits(config?.limits?.X ?? 30),
        travelTimeout
      }),
      Y: new AxisFSM({
        label: "Y",
        limits: parseLimits(config?.limits?.Y ?? 30),
        travelTimeout
      }),
      Z: new AxisFSM({
        label: "Z",
        limits: parseLimits(config?.limits?.Z ?? 12),
        travelTimeout
      })
    };

    this.#config = {
      home: {
        X: config?.home?.X ?? 0,
        Y: config?.home?.Y ?? 0,
        Z: config?.home?.Z ?? 0
      },
      throwOnFault: config?.throwOnFault ?? false
    };

    this.#debug(this.#config);
  }

  /** Spindle Forward */
  M3 = (rpm: number) => this.spindle.M3(rpm);

  /** Spindle Reverse  */
  M4 = (rpm: number) => this.spindle.M4(rpm);

  /** Spindle Stop */
  M5 = () => this.spindle.M5();

  /** Rapid Move */
  G0 = (vector: Vector) => this.#moveTo(vector, "G0");

  /** Feed Move */
  G1 = (vector: Vector) => this.#moveTo(vector, "G1");

  getPosition() {
    return {
      X: this.axes.X.position,
      Y: this.axes.Y.position,
      Z: this.axes.Z.position
    };
  }

  getStats() {
    return {
      positions: this.getPosition(),
      spindle: this.spindle.stats
    };
  }

  setHome(
    axis: keyof typeof this.axes,
    location: number | ((limits: AxisLimits) => number)
  ) {
    const home =
      typeof location === "number"
        ? location
        : location(this.axes[axis].limits);

    if (!this.axes[axis].isValidPosition(home)) {
      throw new Error(`${home} is not within the ${axis} axis limits.`);
    }

    this.#config.home[axis] = home;
    this.#debug("set home to", home);
  }

  on<T extends keyof EmittedEvents>(
    event: T,
    cb: (eventData: EmittedEvents[T]) => void
  ) {
    return this.#events.on(event, cb);
  }

  async reset() {
    return Promise.all([
      this.axes.X.reset(),
      this.axes.Y.reset(),
      this.axes.Z.reset()
    ]);
  }

  async #moveTo(position: Position, command: MotionType) {
    this.#debug({ command, position });
    const moves = [];

    const { X, Y, Z } = position;
    if (X) moves.push(this.axes.X.moveTo(X, command));
    if (Y) moves.push(this.axes.Y.moveTo(Y, command));
    if (Z) moves.push(this.axes.Z.moveTo(Z, command));

    await Promise.all(moves);

    return this.#events.emit("MOTION_COMPLETE", this.getPosition());
  }
}

type Position = Partial<Record<"X" | "Y" | "Z", number>>;
