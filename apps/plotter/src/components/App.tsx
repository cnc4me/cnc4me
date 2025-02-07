import "@fontsource/roboto";
import "./App.css";

import { Button, Paper, Stack, Typography } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { random } from "colord";
import { useCallback, useMemo, useReducer } from "react";

import Canvas, { type Dimensions } from "./Canvas";
import { stateReducer } from "./reducer";

import type { IPosition, IStroke, Line, Shapes } from "../types";

export function App() {
  const [$state, $dispatch] = useReducer(stateReducer, {
    home: { x: 0, y: 0 },
    shapes: [],
    lineWidth: 2,
    lineColor: "crimson"
  });

  const cursor = useMemo<IPosition>(() => {
    const lastShape = $state.shapes[$state.shapes.length - 1];
    if (lastShape?.type === "line") {
      return { x: lastShape.x2, y: lastShape.y2 };
    }
    return { x: 0, y: 0 };
  }, [$state.shapes]);

  const getRandomPosition = useCallback(
    () => ({
      x: Math.floor(Math.random() * $state.home.x * 2),
      y: Math.floor(Math.random() * $state.home.y * 2)
    }),
    [$state]
  );

  // UPDATE THIS TO USE $DISPATCH
  const lineTo = useCallback(
    (params: IPosition & Partial<IStroke>) => {
      const lineShape: Line = {
        type: "line",
        x1: NaN,
        y1: NaN,
        x2: params.x,
        y2: params.y,
        color: params.color ?? $state.lineColor,
        strokeWidth: params.strokeWidth ?? $state.lineWidth
      };
      $dispatch({ type: "ADD_SHAPE", payload: lineShape });
    },
    [$state]
  );

  // const arc = (params: Omit<Arc, "type">) => {
  //   setShapes(shapes => [...shapes, { type: "arc", ...params }]);
  // };

  const canvasResized = (data: Dimensions) => {
    const position: IPosition = { x: data.width / 2, y: data.height / 2 };
    $dispatch({ type: "SET_HOME", payload: position });
    // setHome(position);
    // setCursor(position);
  };

  // // For demonstration: draw randomly :)
  // useLayoutEffect(() => {
  //   setTimeout(() => {
  //     setInterval(() => {
  //       const position = getRandomPosition(home);
  //       lineTo({
  //         ...position,
  //         color: "red"
  //       });
  //     }, 200);
  //   }, 2000);
  // }, []);

  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      <Grid size={3}>
        <Stack
          direction="column"
          justifyContent="center"
          padding="20px"
          gap="10px"
        >
          <Paper sx={{ padding: "10px 20px" }}>
            <Typography
              variant="h3"
              sx={{ padding: "15px 0", textAlign: "center" }}
            >
              Plotter
            </Typography>
            <Stack gap={1}>
              <Button
                onClick={() =>
                  lineTo({
                    x: cursor.x,
                    y: cursor.y,
                    color: "purple"
                  })
                }
              >
                Move to Home ({$state.home.x}, {$state.home.y})
              </Button>
              <Button
                onClick={() =>
                  lineTo({
                    x: cursor.x,
                    y: cursor.y - 77,
                    color: "black"
                  })
                }
              >
                Move Up
              </Button>
              <Button
                onClick={() =>
                  lineTo({
                    x: cursor.x + 50,
                    y: cursor.y,
                    color: "blue"
                  })
                }
              >
                Move Right
              </Button>
              <Button
                onClick={() =>
                  lineTo({
                    x: cursor.x,
                    y: cursor.y + 33,
                    color: "yellow"
                  })
                }
              >
                Move Down
              </Button>
              <Button
                onClick={() =>
                  lineTo({
                    x: cursor.x - 25,
                    y: cursor.y,
                    color: "green"
                  })
                }
              >
                Move Left
              </Button>
              <Button onClick={() => lineTo({ x: 200, y: 200, color: "blue" })}>
                Move to (200, 200)
              </Button>
              <Button
                onClick={() =>
                  lineTo({ ...getRandomPosition(), color: "brown" })
                }
              >
                Move Randomly
              </Button>
              <Button
                onClick={async () => {
                  for (let i = 0; i < 1000; i++) {
                    const position = getRandomPosition();
                    await new Promise(resolve =>
                      setTimeout(() => {
                        lineTo({
                          ...position,
                          color: random().toHex(),
                          strokeWidth: 2
                        });
                        resolve(void 0);
                      }, 1)
                    );
                  }
                }}
              >
                Party!
              </Button>
            </Stack>
          </Paper>

          <Paper sx={{ padding: "10px 20px" }}>
            <Stack gap={1} paddingY="10px" sx={{ textAlign: "center" }}>
              <Typography variant="h3">Cursor</Typography>
              <Typography variant="h5">
                X: {cursor.x}, Y: {cursor.y}
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Grid>
      <Grid size={9}>
        <Canvas
          width={200}
          height={200}
          state={$state}
          onCanvasResize={canvasResized}
          style={{ backgroundColor: "ivory" }}
        ></Canvas>
      </Grid>
    </Grid>
  );
}
