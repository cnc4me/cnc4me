import type { CssColor, IPosition, Shapes } from "../types";

export type Action =
  | {
      type: "SET_HOME";
      payload: IPosition;
    }
  | {
      type: "ADD_SHAPE";
      payload: Shapes;
    }
  | ((state: AppState) => AppState);

export interface AppState {
  home: IPosition;
  shapes: Shapes[];
  lineColor: CssColor;
  lineWidth: number;
}

export function stateReducer(state: AppState, action: Action): AppState {
  if (typeof action === "function") {
    return action(state);
  }

  switch (action.type) {
    case "SET_HOME":
      return { ...state, home: action.payload };
    case "ADD_SHAPE":
      const newShape = action.payload;

      if (newShape.type === "line") {
        if (state.shapes.length > 0) {
          const lastShape = state.shapes[state.shapes.length - 1];
          if (lastShape.type === "line") {
            newShape.x1 = lastShape.x2;
            newShape.y1 = lastShape.y2;
          }
        } else {
          newShape.x1 = state.home.x;
          newShape.y1 = state.home.y;
        }
      }

      return { ...state, shapes: [...state.shapes, action.payload] };
    default:
      return state;
  }
}
