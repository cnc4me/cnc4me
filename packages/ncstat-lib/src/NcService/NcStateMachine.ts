import { createMachine } from "@xstate/fsm";

export interface NcMachineContext {
  position: {
    curr: { X: number; Y: number; Z: number; B: number };
    prev: { X: number; Y: number; Z: number; B: number };
  };
}

export type NcMachineEvent =
  | { type: "START_TOOLPATH" }
  | { type: "END_TOOLPATH" }
  | { type: "START_CANNED_CYCLE" }
  | { type: "END_CANNED_CYCLE" };

export type NcMachineState =
  | {
      value: "IDLE";
      context: NcMachineContext & {
        position: {
          curr: {
            X: undefined;
            Y: undefined;
            Z: undefined;
            B: undefined;
          };
          prev: {
            X: undefined;
            Y: undefined;
            Z: undefined;
            B: undefined;
          };
        };
      };
    }
  | {
      value: "TOOLPATHING";
      context: NcMachineContext;
    }
  | {
      value: "IN_CANNED_CYCLE";
      context: NcMachineContext;
    };

export const NcStateMachine = createMachine<
  NcMachineContext,
  NcMachineEvent,
  NcMachineState
>({
  id: "ncstat",
  initial: "IDLE",
  context: {
    position: {
      curr: { X: 0, Y: 0, Z: 0, B: 0 },
      prev: { X: 0, Y: 0, Z: 0, B: 0 }
    }
  },
  states: {
    IDLE: {
      on: {
        START_TOOLPATH: {
          target: "TOOLPATHING"
        }
      }
    },
    TOOLPATHING: {
      on: {
        END_TOOLPATH: "IDLE",
        START_CANNED_CYCLE: "IN_CANNED_CYCLE"
      }
    },
    IN_CANNED_CYCLE: {
      on: {
        END_TOOLPATH: "IDLE",
        END_CANNED_CYCLE: "TOOLPATHING"
      }
    }
  }
});
