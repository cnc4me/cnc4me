import { assign, setup } from "xstate";

/**
 * Rotation direction of the spindle
 * 1 = Forward (CW), 0 = Stopped, -1 = Reverse (CCW)
 */
export enum Rotation {
  Forward = 1,
  Stopped = 0,
  Reverse = -1
}

export const spindle = setup({
  types: {} as {
    input: Partial<{
      maxRPM: number;
      onExceedMaxRPM: "fault" | "clamp";
      simulateAcceleration: number;
    }>;
    context: {
      maxRPM: number;
      direction: Rotation;
      currentRPM: number;
      targetRPM: number;
      onExceedMaxRPM: "fault" | "clamp";
      simulateAcceleration: number;
    };
    events:
      | { type: "stop" }
      | { type: "reset" }
      | { type: "forward"; rpm: number }
      | { type: "reverse"; rpm: number }
      | { type: "reached_target_rpm" }
      | { type: "fault_occurred"; fault: string };
  },
  actions: {
    setForwardDirection: assign({
      direction: _ => Rotation.Forward
    }),
    setReverseDirection: assign({
      direction: _ => Rotation.Reverse
    }),
    setTargetRPM: assign({
      targetRPM: ({ context, event }) => {
        if (event.type === "forward" || event.type === "reverse") {
          if (
            event.rpm > context.maxRPM &&
            context.onExceedMaxRPM === "fault"
          ) {
            throw new Error("Commanded RPM exceeds maximum RPM");
          }

          // Clamping at max
          return Math.min(event.rpm, context.maxRPM);
        }
        return context.currentRPM;
      }
    }),
    handleFault: ({ event }) => {
      if (event.type === "fault_occurred") {
        console.error("Fault occurred:", event.fault);
      }
    }
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGUAOBLAdhANmAYsgLIB06uYAxAGYD2ATgO4CG9EA2gAwC6ioqtWOgAu6Wpj4gAHogBsATgAsJAIwAONQGZFnRQFZZnFQHZZAGhABPOfpKzj6tXsVrjAJmOmAvl4tosFISk5HiU9GAAbmD0sGBcvEggAkKi4pIyCG7aJPJqippaKpzyBvLymhbWCLK29uqybvIqekWKij5+GNh4QSTMAMb9YHj0zKKYUJSwwrSo8ZLJImISiRl6ZSSKbo4qRYVuapWImsUkepxuzs65siptHSD+3QTEfYPD0WNYk9TMAK44YQAfVogz+9HCHB4C0ESzSq0Q63km22Gl2nH2hysiC2mhInAuV1yxkJDyegVeAyGIy+EzCYAGAAtIEDhKwYMD6KgALbzRKLVIrUAZLLKXL5QrFUrlI6ZDw5PSaXbybbGJSKFSyMldCmkCBgamfcY-f6AkFgiGQPn8WGC9KIJpuHKcBqaAqGRQNPSyjzIvSXeTGPIYgoarW+R46nqvX4A4T02LCa1JW3Le0ITiyzjagLR0j0P6YTDfKYzObQ-mp+HCxCinJ5ApKqUKGXYhAmYybRW7Tz+hxuDw5569AtFkuxs2g-rgyHJgVphGZbLixtFEotipttQqTZlMoFbctEnGHwRzC0fXwRLkvMwlILmsIAC0LllT9cZwJBJa9kMmlkmhDrqZAUHecJCtIOJuLK5TKM0ijGFsnB6GonBqkBeZvIaozGmBdqLvoegkKKB7EgOeSyvkyLbm4bTrAOJhqBhLx6gaHw4d8eEPpBCCmJ2sgGAObScG6qHQW2JxOsY-pXJcwlNO0EY3ixJATsIXHVjxa47ncyGeM0ej+vI5htm0ToIU06JuLIhiyExSlRipo7FhMGkQRk8icKoriKCqagqmU1lYlUuJ2PoniuHUBInqeQA */
  id: "SpindleFSM",
  initial: "idle",
  context: ({ input }) => ({
    direction: Rotation.Stopped,
    currentRPM: 0,
    targetRPM: 0,
    onExceedMaxRPM: input?.onExceedMaxRPM ?? "clamp",
    maxRPM: input?.maxRPM ?? 20_000,
    simulateAcceleration: input?.simulateAcceleration ?? 250
  }),
  states: {
    idle: {
      on: {
        forward: {
          target: "accelerating",
          actions: [
            {
              type: "setForwardDirection"
            },
            {
              type: "setTargetRPM"
            }
          ],
          description: "The spindle was commanded to run FORWARD"
        },
        reverse: {
          target: "accelerating",
          actions: [
            {
              type: "setReverseDirection"
            },
            {
              type: "setTargetRPM"
            }
          ],
          description: "The spindle was commanded to run in REVERSE"
        }
      },
      description: "The spindle is idle."
    },
    accelerating: {
      on: {
        stop: {
          target: "decelerating",
          description: "The spindle received a STOP command"
        },
        fault_occurred: {
          target: "fault",
          actions: {
            type: "handleFault"
          }
        },
        reached_target_rpm: {
          target: "running",
          description: "The spindle has reached the Target RPM"
        }
      }
    },
    decelerating: {
      on: {
        fault_occurred: {
          target: "fault",
          actions: {
            type: "handleFault"
          }
        }
      }
    },
    fault: {
      on: {
        reset: {
          target: "idle"
        }
      },
      description: "The spindle is in an error state."
    },
    running: {
      on: {
        stop: {
          target: "decelerating"
        },
        fault_occurred: {
          target: "fault",
          actions: {
            type: "handleFault"
          }
        }
      },
      description: "The spindle is running at the Target RPM"
    }
  }
});
