import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import { SpindleFSM } from "@cnc4me/fanuc-macro-b";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Canvas from "./Canvas";

const spindle = new SpindleFSM();

// Listen to spindle events
spindle.on("RPM_CHANGED", ({ current, target }) => {
  console.log("CURRENT:", current);
  console.log("TARGET:", target);
});

export function App() {
  // Control elements
  // const startForwardBtn = document.getElementById("startForwardBtn");
  // const startBackwardBtn = document.getElementById("startBackwardBtn");
  // const stopBtn = document.getElementById("stopBtn");
  // const targetRPMInput = document.getElementById("targetRPMInput");

  // const forward = () => {
  //   const targetRPM = parseInt(targetRPMInput.value, 10);
  //   spindle.forward(targetRPM);
  // };

  // // Settings
  // const radius = 50;

  // let angle = 0;
  // let lastTimestamp = 0;

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const scaler = Math.sin(frameCount * 0.02) ** 2;
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = `rgba(200, 10, 20, ${scaler})`;
    console.log(Math.sin(frameCount * 0.02) ** 2);
    ctx.beginPath();
    ctx.arc(centerX, centerY, 210 * scaler, 0, 2 * Math.PI);
    ctx.fill();
  };

  //   function drawSpindle() {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);

  //     // Draw spindle (a simple rectangle for illustration)
  //     ctx.save();
  //     ctx.translate(canvas.width / 2, canvas.height / 2);
  //     ctx.rotate(angle);

  //     ctx.fillStyle = "#007bff";
  //     var colors = ["black", "white", "black", "white"];
  //     for (var i = 0; i < 4; i++) {
  //       var startAngle = (i * Math.PI) / 2;
  //       var endAngle = startAngle + Math.PI / 2;
  //       ctx.beginPath();
  //       ctx.moveTo(0, 0);
  //       ctx.arc(0, 0, radius, startAngle, endAngle);
  //       ctx.closePath();
  //       ctx.fillStyle = colors[i];
  //       ctx.fill();
  //       ctx.stroke();
  //     }

  //     ctx.restore();

  //     // Display RPM and state
  //     ctx.font = "12px monospace";
  //     ctx.fillStyle = "#000";
  //     ctx.fillText(`RPM: ${Math.round(spindle.rpms)}`, 10, 20);
  //     ctx.fillText(`Direction: ${spindle.rotation || "stopped"}`, 10, 40);
  //     ctx.fillText(`State: ${spindle.getState()}`, 10, 60);
  //   }

  //   function update(timestamp) {
  //     if (!lastTimestamp) lastTimestamp = timestamp;
  //     const delta = timestamp - lastTimestamp;
  //     lastTimestamp = timestamp;

  //     // Update angle based on spindle speed and direction
  //     const rps = spindle.rpms / 60; // Revolutions per second
  //     const angularSpeed = rps * 2 * Math.PI; // Radians per second

  //     angle +=
  //       (spindle.rotation === "forward" ? 1 : -1) *
  //       angularSpeed *
  //       (delta / 1000);

  //     drawSpindle();
  //     requestAnimationFrame(update);
  //   }

  //   requestAnimationFrame(update);
  // }

  return (
    <Container sx={{ paddingTop: "50px" }}>
      <Paper sx={{ maxWidth: "400px", margin: "0 auto" }}>
        <Stack gap={1}>
          <Typography variant="h3"> Spindle FSM</Typography>
          <Canvas draw={draw} width={400} height={250}></Canvas>
          {/* <ButtonGroup variant="text"> */}
          <Container>
            <Button>Reverse</Button>
            <Button>Stop</Button>
            <Button>Forward</Button>
          </Container>
          {/* </ButtonGroup> */}
          <Box>
            {" "}
            Target RPM:{" "}
            <input
              type="number"
              id="targetRPMInput"
              value="1000"
              min="100"
              max="5000"
              step="100"
            />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}

import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
