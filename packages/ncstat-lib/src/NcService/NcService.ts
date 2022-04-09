import { interpret } from "@xstate/fsm";

import { NcStateMachine } from "./NcStateMachine";

export const NcService = interpret(NcStateMachine);

export type NcServiceType = typeof NcService;
