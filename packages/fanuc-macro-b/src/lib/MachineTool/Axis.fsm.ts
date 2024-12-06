import { assign, setup } from "xstate";

export const AxisFSM = setup({
  types: {} as {
    input: {
      axis: MachineAxis;
      limits: AxisLimitInput;
    };
    context: {
      axis: MachineAxis;
      position: {
        current: number;
        target: number;
      };
      limits: {
        min: number;
        max: number;
      };
    };
    events:
      | { type: "home" }
      | { type: "reset" }
      | { type: "start_travel" }
      | { type: "reach_position" }
      | { type: "overtravel_detected" };
  },
  actions: {
    track: (_, params: { response: string }) => {
      console.log(params.response);
      // Tracks { response: 'good' }
    },
    reset: assign({
      position: () => ({ current: 0, target: 0 })
    })
  },
  guards: {
    willOverTravel: ({ context }) => {
      const { target } = context.position;
      const { min, max } = context.limits;

      return target < min || target > max;
    },
    /**
     * Check if a target position is within the defined limits
     */
    isValidPosition: ({ context }) => {
      const { target } = context.position;
      const { min, max } = context.limits;

      return target > min && target < max;
    }
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEEAeBLWA6dEA2YAxAE5xgAuA2gAwC6ioADgPazrnrMB2DIqiAJmoCArFgDsARgDMIgGySBc6gA4V48QBoQAT0SKBWSeJHUALNWkBOcWatnpZgL5PtaTDnxFY5AIbFyAH1yYl8ANzA8GnokEBY2Dm5efgRJEVksaQEBexVJOXlFM209BBVqLBUBPLk5CxlJKskXNwxsEPDI9C4oEjBfAGMAC0D49k4uaN4xxJ5YlLMBaUrqcRyzEUWVeWLdfWoKkXE8+WVRB0UWkHd20Ii8bt7SWAop2JmJ5P1pPKMpK2oVhkp3kJUE0kkWCEKmkcmk5kWZjsVxuWA690ehGYEQCd0igQgFDAA3IkDeTFY4yS80QVm2mR+RxE5SWWUkYIQ0hMWCOeUclkkNhk0hRbRwXFGlNmhB8-iC6Mi5LiUs+NIQi2W5TW9k21R2HLSkNWJxUcNU4mol1c1zF2LAuM6eD6LyodGmKupoBSaQyWXWNUKAl2pS5Yl5MgsEKF0hFVy4zEJ8FiN3dCVVXsQAFoxHVmTH8-nLBzM3IsHJ-gcY4DjFYRKKPLgCKmqXMM6l1FYy4K8lqzOJ7BzsstFCdFpJzGpnNbUQqHj1m7MvggRFZllZcuPx3JynCOfZMtVjJILEpauJY60GxKPp7lWnbwtDLIzPlam-ajY95CqnkX-C6rIPz1tgdoOvcC7pnw+iCmYKznvkUYqBsIgcoBlSHiIRyiKsdYuE4QA */
  id: "Axis",
  initial: "idle",
  context: ({ input }) => ({
    axis: input.axis,
    limits: parseLimits(input.limits),
    position: {
      current: NaN,
      target: NaN
    }
  }),
  states: {
    idle: {
      on: {
        reset: {
          reenter: true,
          actions: [
            { type: "track", params: { response: "good" } }, //
            { type: "reset" }
          ]
        },
        start_travel: {
          target: "traveling",
          description: "The axis is moving to its commanded location."
        }
      },
      description: "The axis is not moving and is ready to receive commands."
    },

    traveling: {
      on: {
        reach_position: {
          target: "in_position"
        },

        reset: {
          target: "idle",
          actions: "reset"
        },

        overtravel_detected: "overtravel"
      },
      description: "The axis is currently moving towards a target position."
    },

    in_position: {
      on: {
        start_travel: {
          target: "traveling"
        }
      },
      description: "The axis has reached the target position and is stable."
    },

    overtravel: {
      on: {
        reset: {
          target: "idle",
          actions: "reset"
        }
      },
      description: "The axis has moved beyond its safe travel limits."
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
