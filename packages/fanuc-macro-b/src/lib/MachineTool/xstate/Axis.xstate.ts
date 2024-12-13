import { assign, emit, enqueueActions, log, raise, setup } from "xstate";

export const AxisFSM = setup({
  types: {} as {
    input: {
      label: MachineAxis;
      limits: AxisLimitInput;
    };
    context: {
      label: MachineAxis;
      pCurrent: number;
      pTarget: number;
      limits: {
        min: number;
        max: number;
      };
      commandQueue: number[];
    };
    events:
      | { type: "reset" }
      | { type: "home" }
      | { type: "travel"; to: number }
      | { type: "position_reached" }
      | { type: "overtravel_detected" };
    emitted:
      | { type: "in_position"; position: number }
      | { type: "overtravel"; message: string }
      | { type: "in_motion"; from: number; to: number };
  },
  delays: {
    TINY_DELAY: 100,
    QUARTER_SECOND: 250,
    HALF_SECOND: 500,
    ONE_SECOND: 1000,
    FIVE_SECONDS: 5000,
    EVENTUALLY: 10_000
  },
  actions: {
    // online: log(({ context }) => `${context.label} Axis Online`),
    reset: assign(() => {
      console.log("[ RESET ]");
      return {
        pTarget: 0,
        pCurrent: 0,
        commandQueue: []
      };
    }),
    emitInMotion: emit(({ context }) => ({
      type: "in_motion" as const,
      from: context.pCurrent,
      to: context.pTarget
    })),
    raisePositionReached: raise({
      type: "position_reached"
    }),
    inPosition: enqueueActions(({ enqueue, context }) => {
      enqueue.assign(({ context }) => ({
        pCurrent: context.pTarget,
        pTarget: NaN
      }));
      enqueue.emit({
        type: "in_position" as const,
        position: context.pCurrent
      });
    }),
    setTargetPosition: assign({
      pTarget: ({ context, event }) => {
        return event.type === "travel" ? event.to : context.pTarget;
      }
    }),
    queueCommand: assign({
      commandQueue: ({ context, event }) => {
        return event.type === "travel"
          ? [...context.commandQueue, event.to]
          : context.commandQueue;
      }
    }),
    processQueue: enqueueActions(({ enqueue, context }) => {
      const queue = [...context.commandQueue];
      const nextPosition = queue.shift();
      if (nextPosition) {
        enqueue.assign({ commandQueue: queue });
        enqueue.raise({ type: "travel", to: nextPosition });
      }
    })
  },
  guards: {
    isValidPosition: ({ context }, params: { position: number }) => {
      const { limits } = context;
      const target = params.position;
      return target > limits.min && target < limits.max;
    }
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEEAeBLWA6dEA2YAxAC4BOAhgG5h4DaADALqKgAOA9rOseuwHYsQqRABYAjAFYsANgnSATAGYA7AE4xkpWIA0IAJ6IAtCLUzF0+vLGKbY1fJEBfR7rSYsZKjXR8ohUnBgxAzMSCAcXDz8gsIIkljqIvQS9OKaimL0yroGCIY29DLycqnSZRLFss6uGNie1Hg+fvU0IYIR3LwCYbHKivJYJtYS4mVj0jlGInIJ9KrTABwLtvZOLiBudRQNTYQdUXwA+gHkAMYAFpBtYftdMYj0kwj01Ru1HtvevoSosMTkxDAWHIADNAaQABQAeQAcgBRQ4AZThAGFYQARACUhE2Hy8jV81zYnE60R6iDE8gGEkyIis9AWWXEGSehg0igS8mUDOUIkUCzEIgWymkr1xPkOt34JE+dCY7RJB3uCD6UgWI0k02UAoWqgWrPsWGWNkZ8gsyhp8zF7wlUr4-kCwXlN0Vd3JeUy0iwgvoChEqgDgdU2X0RkNxv5lnNlrW6z47AgcEEmwVkTdoFibIsWEUImkudUigkjJpdlZ0iS3vMlgk-NkuuU1vcuAIqdJ3QzRg0A1z+f9RZLGlUrLzHKS82LxrsSkUTa2+KabaV7qLHJFckp6nSOlDeQyIhzAdSVnKlQkc5wRztS-TQkQ-KkKW19FSGgqigNHIs0gFyhFWUtc9nEcIA */
  id: "Axis",
  initial: "idle",
  context: ({ input }) => ({
    label: input.label,
    limits: parseLimits(input.limits),
    pCurrent: NaN,
    pTarget: NaN,
    commandQueue: []
  }),
  entry: [
    log(({ context }) => `${context.label} Axis Online`),
    log(({ context: { limits } }) => `Limits: [${limits.min}|${limits.max}]`)
  ],
  states: {
    idle: {
      description: "The axis is idle and waiting for commands.",
      on: {
        travel: {
          target: "traveling",
          guard: {
            type: "isValidPosition",
            params: ({ event }) => ({ position: event.to })
          },
          actions: {
            type: "setTargetPosition"
          }
        }
      }
    },
    traveling: {
      description: "The axis is currently moving towards a target position.",
      entry: [
        log(({ context }) => `Traveling to ${context.pTarget}...`),
        emit(({ context }) => ({
          type: "in_motion",
          from: context.pCurrent,
          to: context.pTarget
        }))
      ],
      after: {
        ONE_SECOND: {
          actions: raise({ type: "position_reached" })
        }
      },
      on: {
        reset: {
          target: "idle",
          actions: { type: "reset" }
        },
        travel: {
          actions: { type: "queueCommand" }
        },
        position_reached: {
          target: "in_position",
          actions: { type: "inPosition" }
        }
      }
    },
    in_position: {
      description: "The axis is at a stable commanded position.",
      entry: [
        log(({ context }) => `Axis in position: ${context.pCurrent}`),
        { type: "processQueue" }
      ],
      on: {
        travel: {
          target: "traveling",
          guard: {
            type: "isValidPosition",
            params: ({ event }) => ({ position: event.to })
          },
          actions: {
            type: "setTargetPosition"
          }
        },
        reset: {
          target: "idle",
          actions: { type: "reset" }
        }
      }
    }
  }
});

export type MachineAxis = "X" | "Y" | "Z";
export type AxisLimits = Record<"min" | "max", number>;
export type AxisLimitInput =
  | number
  | [negative: number, positive: number]
  | AxisLimits;
export type AxisStateMachine = typeof AxisFSM;

function parseLimits(limits: AxisLimitInput): AxisLimits {
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
