import Emittery from "emittery";
import PQueue from "p-queue";

import { Debuggers } from "../utils";
import { AxisFSM } from "./AxisFSM";
import { SpindleFSM } from "./SpindleFSM";

import type { IParsedLineData } from "../types";
import type {
  AxisFsmEvents,
  AxisLabel,
  AxisLimits,
  AxisLimitsInput,
  MotionType,
  Position
} from "./fsm.types";

export class CncMachine {
  static EVENTS: Omit<AxisFsmEvents, "MOTION_COMPLETE"> & {
    MOTION_COMPLETE: Position;
  };

  axes: {
    X: AxisFSM;
    Y: AxisFSM;
    Z: AxisFSM;
  };

  spindle: SpindleFSM;
  activeMotionType: MotionType = "G0";

  #config: {
    home: {
      X: number;
      Y: number;
      Z: number;
    };
    throwOnFault: boolean;
  };

  readonly #events = new Emittery<typeof CncMachine.EVENTS>();
  readonly #commands = new PQueue({ autoStart: true, concurrency: 1 });
  readonly #debug = Debuggers.Main.extend("machine");

  // Constructor
  constructor(
    config?: Partial<{
      home: Partial<Record<AxisLabel, number>>;
      limits: Partial<Record<AxisLabel, AxisLimitsInput>>;
      throwOnFault: boolean;
      axisTravelTimeout: number;
      spindle: ConstructorParameters<typeof SpindleFSM>[0];
    }>
  ) {
    const travelTimeout = config?.axisTravelTimeout ?? 200;

    this.#debug(`initializing spindle`);
    this.spindle = new SpindleFSM(config?.spindle);

    this.#debug(`initializing axes`);
    this.axes = {
      X: new AxisFSM("X", {
        limits: config?.limits?.X ?? 30,
        travelTimeout
      }),
      Y: new AxisFSM("Y", {
        limits: config?.limits?.Y ?? 30,
        travelTimeout
      }),
      Z: new AxisFSM("Z", {
        limits: config?.limits?.Z ?? 12,
        travelTimeout
      })
    };

    this.#debug(`initialized with config`);
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

  on = this.#events.on.bind(this.#events);
  onAny = this.#events.onAny.bind(this.#events);

  /**
   * Handle lines from the interpreter to simulate the machine
   */
  processLineData(line: IParsedLineData) {
    // this.#debug("got a line", line);
    if (line.gCodeMap["G0"]) {
      this.activeMotionType = "G0";
    }
    if (line.gCodeMap["G1"]) {
      this.activeMotionType = "G1";
    }

    let hasPosition = false;
    const position: Position = {};
    for (const addr of line.addresses) {
      if (addr.prefix === "X") {
        hasPosition = true;
        position.X = addr.value;
      }
      if (addr.prefix === "Y") {
        hasPosition = true;
        position.Y = addr.value;
      }
      if (addr.prefix === "Z") {
        hasPosition = true;
        position.Z = addr.value;
      }
    }

    if (hasPosition) {
      void this.#commands.add(() =>
        this.#moveTo(position, this.activeMotionType)
      );
    }
  }

  /** Spindle Forward */
  M3 = (rpm: number) => this.spindle.M3(rpm);

  /** Spindle Reverse  */
  M4 = (rpm: number) => this.spindle.M4(rpm);

  /** Spindle Stop */
  M5 = () => this.spindle.M5();

  /** Rapid Move */
  G0 = (position: Position) => this.#moveTo(position, "G0");

  /** Feed Move */
  G1 = (position: Position) => this.#moveTo(position, "G1");

  /** Travel to a new position with the active motion type */
  travel = async (position: Position) => {
    await this.#moveTo(position, this.activeMotionType);
  };

  getPosition(): Position {
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

  async reset() {
    return Promise.all([
      this.axes.X.reset(),
      this.axes.Y.reset(),
      this.axes.Z.reset()
    ]);
  }

  async #moveTo(position: Position, command: MotionType) {
    this.#debug(command);
    const moves = [];

    const { X, Y, Z } = position;
    if (X) moves.push(await this.axes.X.moveTo(X, command));
    if (Y) moves.push(await this.axes.Y.moveTo(Y, command));
    if (Z) moves.push(await this.axes.Z.moveTo(Z, command));

    await Promise.all(moves);

    void this.#events.emit("MOTION_COMPLETE", this.getPosition());
  }
}
