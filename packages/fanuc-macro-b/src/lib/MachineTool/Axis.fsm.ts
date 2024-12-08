import { assign, emit, log, not, raise, setup } from "xstate";

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
    };
    events:
      | { type: "reset" }
      | { type: "travel"; to: number }
      | { type: "target_position_reached" }
      | { type: "overtravel_detected" };
    emitted:
      | { type: "in_position"; position: number }
      | { type: "other1" }
      | { type: "other2" };
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
    track: (_, params: { response: string }) => {
      console.log(params.response);
      // Tracks { response: 'good' }
    },
    reset: assign({
      pTarget: () => 0,
      pCurrent: () => 0
    }),
    emitInPosition: emit(({ context }) => ({
      type: "in_position" as const,
      position: context.pCurrent
    })),
    targetPositionReached: raise(
      { type: "target_position_reached" },
      { delay: 200 }
    ),
    move: assign({
      pTarget: ({ context, event }) => {
        return event.type === "travel" ? event.to : context.pTarget;
      }
    }),
    // assignTargetPosition: assign({
    //   pTarget: (_, params: { position: number }) => params.position
    // }),
    setTargetPosition: assign({
      pTarget: (_, params: { position: number }) => params.position
    }),
    setCurrentPositionFromTarget: assign(({ context }) => ({
      pCurrent: context.pTarget,
      pTarget: NaN
    }))
  },
  guards: {
    willOverTravel: ({ context: { limits, pTarget } }) => {
      const test = pTarget < limits.min || pTarget > limits.max;
      console.log("will overtravel", pTarget, test);
      return test;
    },
    isValidPosition: ({ context }, params: { position: number }) => {
      const { limits } = context;
      const target = params.position;
      return target > limits.min && target < limits.max;
    }
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEEAeBLWA6dEA2YAxAE5xgAuA2gAwC6ioADgPazrnrMB2DIqiAWgBM1LAHYAnAFYxQgMwAWIWLnUAjADYhCgDQgAnoLlrRGuQA45Ek2olyZCgL6O9aTDnxFyxAIYA3MDwaeiQQFjYObl5+BCEJBSwlbQlrNUkNBSk9QwQBTSw1BTEHamtzeKFzKWdXDGxvf0D0LihCch9iGHIAfXD2Ti5u0h8AYwALSGDePsieUJiJcwTpaUqJISEpEzFswWUEjSqhDWoT83NTsScXEDd63wC8ZtbSWAop0JmB6ME0rGNrNo1HE1FI5Bo7LsECYNFh5BspOUNGCrhIxDVbnUsA1Hs9CMwAsQcYFuhAKGARuRJnRpqx+lF5ogNGIxFhqNQNuZiuZlFchFDjuZElJqAo5GIMmlBRoMXdsQ8mi02gqgjTPnTZj8EAolIk0eY1AaFNRzlIdVDhGjEmpDeKeXJKqdZVjiU8lahYO0qVgfAAzKnEAAUABUAJIAOQAmt0ACIAUQAMshIwBKQhy13PD5MDXfRnQ6jgxLGOLUMS2DlxAVyLA88rxTTScuLao3OXNXq57jKxqqkI5iJ50ALKRCLASLRmsrHUrmKEwuEO7RCEzlWQKCTO9y+nwAVzw5BIZCoaoH9Lmw9+QsL7MOhvt0jUAqkUkSKi5ciXUgkoucNy4zBkvAoR3LSg4MpeuRqJ+4hSBoyLFOspy6AYRiLAUFhWGk5ZpJoW7YLgBBgeeWoCFUsHwTI34iGYKQWoUsLsqORQWMoILmPh8q9s8xGavmzKwpYhZVCkhY2PRCiMdQo4WNImTKNInEdl8EFhF2F58IgNpWiu5jIoodhFPyqFQWYbLSUCwKZJIiycTu+7kLxQ6aQgiismChqLGiLKflkJnKGo4jspkxgsiyYoyn+QA */
  id: "Axis",
  initial: "idle",
  context: ({ input }) => ({
    label: input.label,
    limits: parseLimits(input.limits),
    pCurrent: NaN,
    pTarget: NaN
  }),
  states: {
    idle: {
      on: {
        reset: {
          reenter: true,
          actions: [
            { type: "track", params: { response: "good" } }, //
            { type: "reset" }
          ],
          description: "Reset to clear any error messages."
        },
        travel: {
          target: "traveling",
          actions: [
            {
              type: "move"
            }
          ],
          description: "The axis is moving to its commanded location."
        }
      },
      description: "The axis is not moving and is ready to receive commands."
    },

    traveling: {
      after: {
        TINY_DELAY: {
          target: "in_position"
        }
      },
      on: {
        target_position_reached: {
          target: "in_position",
          description: "The Axis is stable at the commanded position."
        },

        reset: {
          target: "idle",
          actions: {
            type: "reset"
          },
          description: "Abort the current axis movement."
        },

        overtravel_detected: {
          target: "fault",
          description:
            "An overtravel has occured and placed the Axis in a fault state."
        },

        travel: {
          target: "traveling",
          actions: [
            {
              type: "move"
            }
          ],
          description: "While in motion, a new position was commanded."
        }
      },
      description: "The axis is currently moving towards a target position."
    },

    in_position: {
      entry: {
        type: "setCurrentPositionFromTarget"
      },
      on: {
        travel: {
          target: "traveling",
          actions: {
            type: "move",
            params: ({ event }) => event.to
          },
          description: "The Axis was commanded to a new position."
        }
      },
      description: "The axis has reached the target position and is stable."
    },

    fault: {
      on: {
        reset: {
          target: "idle",
          actions: "reset",
          description: "Reset the Axis from its fault state."
        }
      },
      description: "The Axis encountered an error."
    }
  }
});

export type MachineAxis = "X" | "Y" | "Z";
export type AxisLimits = Record<"min" | "max", number>;
export type AxisLimitInput = number | [negative: number, positive: number];
export type AxisStateMachine = typeof AxisFSM;

function parseLimits(limits: AxisLimitInput): AxisLimits {
  if (Array.isArray(limits)) {
    if (limits[1] === limits[0]) {
      throw new Error(`(+) & (-) limits cannot be equal`);
    }
    if (limits[0] > limits[1]) {
      throw new Error(`(-) limit cannot be greater than the (+) limit`);
    }
    if (limits[1] < limits[0]) {
      throw new Error(`(+) limit cannot be smaller than the (-) limit`);
    }
    return {
      min: limits[0],
      max: limits[1]
    };
  } else {
    return {
      min: -1 * Math.abs(limits),
      max: Math.abs(limits)
    };
  }
}
