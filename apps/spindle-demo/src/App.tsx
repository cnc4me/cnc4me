import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import { SpindleFSM } from "@cnc4me/fanuc-macro-b";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";

import Canvas from "./Canvas";

const a2rad = (a: number) => a * (Math.PI / 180);

const spindle = new SpindleFSM({
  rpm: { max: 8000 }
});

export function App() {
  const [fps, setFps] = useState(30);
  const [radius, setRadius] = useState(100);
  const [targetRPM, setTargetRpm] = useState(200);

  const rotationsPerFrame = useMemo(
    () => targetRPM / (60 * fps),
    [fps, targetRPM]
  );

  // Listen to spindle events
  spindle.on("RPM_CHANGED", ({ current, target }) => {
    console.log("CURRENT:", current);
    console.log("TARGET:", target);
  });

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const { height, width } = ctx.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const spindleCenter = centerY + 25;

    const colors = ["black", "white"];
    const textX = 10;
    const textStartY = 20;
    const textGap = 15;
    const arrowGap = 15;

    const overlayText = [
      `RPM: ${Math.round(spindle.rpms)} / ${spindle.config.rpm.max}`,
      `State: ${spindle.getState()}`,
      `Direction: ${spindle.direction}`
    ];

    const angle = spindle.is("Running")
      ? 2 * Math.PI * (frameCount * rotationsPerFrame)
      : 0;

    ctx.clearRect(0, 0, width, height);

    if (1) {
      // Draw red line with arrowhead
      ctx.beginPath();
      ctx.arc(centerX, spindleCenter, radius + arrowGap, -a2rad(25), 0);
      ctx.strokeStyle = "red";
      ctx.stroke();

      // Add arrowhead
      const arrowLength = 20;
      const arrowX = centerX + (radius + arrowGap);

      ctx.beginPath();
      ctx.moveTo(arrowX, spindleCenter);
      ctx.lineTo(
        arrowX + arrowLength * Math.cos(Math.PI / 2.7),
        spindleCenter - arrowLength * Math.sin(Math.PI / 2.7)
      );
      ctx.moveTo(arrowX, spindleCenter);
      ctx.lineTo(
        arrowX - arrowLength * Math.cos(Math.PI / 3),
        spindleCenter - arrowLength * Math.sin(Math.PI / 3)
      );
      ctx.strokeStyle = "red";
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(centerX, spindleCenter);
    ctx.rotate(angle);

    // ctx.fillStyle = "#ff11ff";
    ctx.strokeStyle = "black";
    for (var i = 0; i < 4; i++) {
      var startAngle = i * a2rad(90);
      var endAngle = startAngle + a2rad(90);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[i % 2];
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
    ctx.font = "12px monospace";
    ctx.fillStyle = "#777";
    overlayText.forEach((line, idx) => {
      ctx.fillText(line, textX, textStartY + idx * textGap);
    });
  };

  return (
    <Container sx={{ paddingTop: "50px" }}>
      <Paper sx={{ maxWidth: "400px", margin: "0 auto" }}>
        <Stack gap={1}>
          <Box>
            <Typography variant="h3" sx={{ margin: "20px 0 10px 0" }}>
              Spindle FSM
            </Typography>
          </Box>
          <Canvas draw={draw} width={400} height={300}></Canvas>
          {/* <ButtonGroup variant="text"> */}
          <Stack direction="row">
            <Button onClick={() => spindle.M4(targetRPM)}>Reverse</Button>
            <Button
              onClick={() => {
                if (!spindle.is("Idle")) {
                  spindle.M5();
                }
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
