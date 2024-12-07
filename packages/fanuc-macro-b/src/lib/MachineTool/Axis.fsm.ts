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
      | { type: "move_to_position"; location: number }
      | { type: "target_position_reached" }
      | { type: "overtravel_detected" };
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
    emitEvent: emit({ type: "notification" }),
    targetPositionReached: raise(
      { type: "target_position_reached" },
      { delay: 200 }
    ),
    move: assign({
      pTarget: ({ context, event }) => {
        if (event.type === "move_to_position") {
          // console.log("EVENT", event);
          return event.location;
        }
        return context.pTarget;
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
  /** @xstate-layout N4IgpgJg5mDOIC5QEEAeBLWA6dEA2YAxAE5xgAuA2gAwC6ioADgPazrnrMB2DIqiAFgCsARiwAOAJxCh4gOxTJcgMzihygDQgAnogC0yyViFyhA5bIHVxANkkjqQgL5OtaTDnxEAtswBuYAD65MyBLGwc3DT0SCDh7Jw8sfwIAjbGNpnUaTZmQpK2WroIIhZYuapmAgBMAsLV1c6uIO7Y5MQAhgF46FxQhOQdxDDkYawJ3IGkHQDGABaQ0bzxkUmgKcLUWErKjrni4tTSmjqIIjLlNso2IgpycjbU1HIubhhtnd29-aSwFEuxFaJXgpPSNITlEQ1MziNLVGwNORFRANIwCOSSYRXaio4SvFrvLDtLpgHp9Qj+MDEYndQIQChgGbkRZ0ZbjVYgwS3coWKxyETVQzmATIhDqcRYdHVSTwuTCKTKF7NVpEz6k76EXwBYKhIFRVmA9nA5KIITpbI2A5QkRqI7SISi4RGBHS9RyWoCSTKfEq3pjCKJTWUnX+iZcAFMI3cTkIQ7VSXKeHiZQiBG2Uyi0RYCylOqPAWmESSH2EgBmHQArnhyCQyFQDZGA9GTQgwWbs40i1JqDcjkjTqlzuVzOJatUi2lpC5mlxmPT4LFWmym2s+PpdgIO6ICpIew4lKK9AWsM8zCm0onMbISx5cARl2GY2V7soBKnhbD7hmB22JO7ducab8paAg3h8JJklAD4ci26Ink81DvrYNSpoUA7ShKNhwvkiGHLY3rKoSfp6quJExvcRg4lhUiiMoKY2qKsongc9j5NU-JyNYBFvB45ZVuQ0HGusgjxuINqOF6khYVh2Siu6zqWHYr5ic84jTk4QA */
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
        move_to_position: {
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
        HALF_SECOND: {
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

        move_to_position: {
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
        move_to_position: {
          target: "traveling",
          actions: {
            type: "move",
            params: ({ event }) => event.location
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
