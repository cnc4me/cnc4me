import { assign, createActor, sendTo, setup } from "xstate";

import { AxisFSM } from "./Axis.fsm";

import type { ActorRefLike } from "xstate";

export const VerticalMill = setup({
  types: {} as {
    context: {
      X: ActorRefLike;
      Y: ActorRefLike;
      Z: ActorRefLike;
    };
    events:
      | { type: "home" }
      | { type: "reset" }
      | { type: "reach_position" }
      | { type: "move_to_position" }
      | { type: "overtravel_detected" };
  },
  actors: { X: AxisFSM, Y: AxisFSM, Z: AxisFSM },
  actions: {
    reset: () => {
      sendTo("X", { type: "reset" });
      sendTo("Y", { type: "reset" });
      sendTo("Z", { type: "reset" });
    },
    moveX: ({ event }) => {
      console.log(event);
      sendTo("X", { type: "move_to_position", ax });
    }
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDUwCcAuBLAxgQwBsBZLAggOiwgLAGI04wMBtABgF1FQAHAe1izZeAOy4gAHogCMATgAsAJnIB2KQA5lAVgA0IAJ6IFANlYrNAZikLNAXxu7UmXIRJlK1OgFteANzAB9DF5-PgEhYTZOJBBQwSwRMUkEKTllc3INHX1pBTVyW3sQR2x8YlIKDDQ8PwIsYSh6RhYOMVjwxMQZBXS1GVYja10DBHNjcgVWSxS1BWVUuTsHdBKXcvJK6rBa+sa8HAALEP44kUjW4-bopPMB8nNNGXMtIcQ5Vhlxyal7qWVrY36iyKy2cZTcGxqdQavmWVRq-ggTDAOAwkDO0Ta8VEV063QyfQGWWGciMeWUX2ms1S5nkQOKoNcFDqRzCWNo3j8gWCmNOLQxFyxHRGinIrCkmkJLwQcgeKgpchmczStMK9NKjPIMMwcK2jVgTHRPAFCRxyWpGWe2WlpLlUwVVOVCyBwl4iPg0TVqzI51ZJtASQAtEYpUG6SD1WsqDQfSdsf7pMo+uQZGo5E8iYhLEZxhYpKwSZo5PJEwUlk4I+CddsoDHLvGEBYlIXSZbiQo5Mnc-mjIXiyqyyswUzhCzY7XBabFFLFKZlGojGnE2oZmorKXgeWvRQtRCtuO-RJpN90vdHq3XiTO5Zu73Uiq7EA */
  id: "VerticalMill",

  initial: "idle",

  // entry: [],

  context: ({ spawn }) => ({
    X: spawn("X", { input: { axis: "X", limits: 500 } }),
    Y: spawn("Y", { input: { axis: "Y", limits: 500 } }),
    Z: spawn("Z", { input: { axis: "Z", limits: 500 } })
  }),

  states: {
    idle: {
      on: {
        reset: {
          reenter: true
        },
        move_to_position: {
          target: "traveling",
          description: "The axis was commanded a new position."
          // actions: assign({})
        }
      },
      description: "The axis is not moving and is ready to receive commands."
    },

    traveling: {
      on: {
        reset: {
          target: "idle"
        },
        reach_position: {
          target: "in_position"
        },
        overtravel_detected: {
          target: "overtravel"
        }
      },
      description: "The axis is currently moving towards a target position."
    },

    in_position: {
      type: "final",
      on: {
        move_to_position: {
          target: "traveling"
        }
      },
      description: "The axis has reached the target position."
    },

    overtravel: {
      on: {
        reset: {
          target: "idle"
        }
      },
      description: "The axis has moved beyond its safe travel limits."
    }
  }
});
