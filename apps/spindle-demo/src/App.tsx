import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";

import Canvas from "./Canvas";

import type { SpindleFSM } from "@cnc4me/fanuc-macro-b";

export function App({ spindle }: { spindle: SpindleFSM }) {
  const [targetRPM, setTargetRpm] = useState(200);
  const overlayText = useMemo<string[]>(
    () => [
      `RPM: ${Math.round(spindle.rpms)} / ${spindle.config.rpm.max}`,
      `State: ${spindle.getState()}`,
      `Direction: ${spindle.direction}`
    ],
    [spindle]
  );

  // Listen to spindle events
  spindle.on("RPM_CHANGED", ({ current, target }) => {
    console.log("CURRENT:", current);
    console.log("TARGET:", target);
  });

  // // Settings
  const radius = 50;

  let angle = 0;
  // let lastTimestamp = 0;

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const { height, width } = ctx.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    const textX = 10;
    const textStartY = 20;
    const textGap = 20;
    const scaler = Math.sin(frameCount * 0.02) ** 2;

    // console.log(scaler);

    ctx.clearRect(0, 0, width, height);
    // ctx.fillStyle = `rgba(100, 20, 230, ${scaler})`;
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, 300 * scaler, 0, 2 * Math.PI);
    // ctx.fill();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    ctx.fillStyle = "#007bff";
    var colors = ["black", "white", "black", "white"];
    for (var i = 0; i < 4; i++) {
      var startAngle = (i * Math.PI) / 2;
      var endAngle = startAngle + Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
    ctx.font = "12px monospace";
    ctx.fillStyle = "#000";
    overlayText.forEach((line, idx) => {
      ctx.fillText(line, textX, textStartY + idx * textGap);
    });

    angle = (frameCount > 360 ? frameCount % 360 : frameCount) / scaler / 2;
  };

  return (
    <Container sx={{ paddingTop: "50px" }}>
      <Paper sx={{ maxWidth: "400px", margin: "0 auto" }}>
        <Stack gap={1}>
          <Box>
            <Typography variant="h3" sx={{ marginTop: "20px" }}>
              Spindle FSM
            </Typography>
          </Box>
          <Canvas draw={draw} width={400} height={250}></Canvas>
          {/* <ButtonGroup variant="text"> */}
          <Stack direction="row">
            <Button onClick={() => spindle.M4(targetRPM)}>Reverse</Button>
            <Button
              onClick={() => {
                setTargetRpm(0);
                spindle.M5();
              }}
            >
              Stop
            </Button>
            <Button onClick={() => spindle.M3(targetRPM)}>Forward</Button>
          </Stack>
          {/* </ButtonGroup> */}
          <Box>
            <Slider
              marks
              valueLabelDisplay="auto"
              defaultValue={30}
              shiftStep={30}
              step={10}
              min={10}
              max={110}
              onChange={(_, value) => {
                const newVal = Array.isArray(value) ? value[0] : value;
                setTargetRpm(newVal);
              }}
            />{" "}
            Target RPM:{" "}
            <input
              type="number"
              id="targetRPMInput"
              value={targetRPM}
              min="100"
              max={spindle.config.rpm.max}
              step="100"
              onChange={e => {
                setTargetRpm(Number(e.target.value));
              }}
            />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
