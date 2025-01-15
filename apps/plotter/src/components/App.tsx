import "@fontsource/roboto";
import "./App.css";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

import Plotter from "./Plotter";

import type { Arc, CssColor, Line, Shapes } from "../types";

export function App() {
  const [fps, setFps] = useState(30);
  const [defaultColor, setDefaultColor] = useState<CssColor>("crimson");
  const [defaultStrokeWidth, setDefaultStrokeWidth] = useState<number>(1);

  const [shapes, setShapes] = useState<Shapes[]>([]); // Store shapes to render

  const line = (params: Omit<Line, "type">) => {
    setShapes(shapes => [...shapes, { type: "line", ...params }]);
  };
  const arc = (params: Omit<Arc, "type">) => {
    setShapes(shapes => [...shapes, { type: "arc", ...params }]);
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    shapes.forEach(shape => {
      if (shape.type === "line") {
        const { x1, y1, x2, y2, color, strokeWidth } = shape;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color ?? defaultColor;
        ctx.lineWidth = strokeWidth ?? defaultStrokeWidth;
        ctx.stroke();
      }
    });
  };

  // For demonstration: adding commands on mount
  useEffect(() => {
    line({ x1: 10, y1: 10, x2: 200, y2: 10, color: "red" });
    line({ x1: 200, y1: 10, x2: -200, y2: 210, color: "blue" });
    // arc({ cx: 150, cy: 100, radius: 50, startAngle: 0, endAngle: Math.PI / 2, color: 'blue' });
  }, []);

  return (
    <Grid container spacing={2} sx={{ height: "100%" }}>
      <Grid size={3}>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Paper sx={{ padding: "0 20px" }}>
            <Stack gap={1}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{ padding: "25px 0", textAlign: "center" }}
                >
                  Plotter
                </Typography>
                <Button
                  onClick={() =>
                    line({
                      x1: 50,
                      y1: 50,
                      x2: 250,
                      y2: 50,
                      color: "green",
                      strokeWidth: 3
                    })
                  }
                >
                  Add Line
                </Button>
                <Button
                  onClick={() =>
                    arc({
                      cx: 200,
                      cy: 200,
                      radius: 75,
                      startAngle: 0,
                      endAngle: Math.PI,
                      color: "purple"
                    })
                  }
                >
                  Add Arc
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Grid>
      <Grid size={9}>
        <Plotter draw={draw} height={200} width={400} />
      </Grid>
    </Grid>
  );
}
