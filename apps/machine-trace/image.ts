import fs from "node:fs";

import { type Canvas, createCanvas } from "canvas";

function useCanvas(width: number, height: number) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Fill the canvas with a white background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  const pixelAt = (
    location: [X: number, Y: number],
    size: number,
    color: string
  ) => {
    ctx.fillStyle = color;
    ctx.fillRect(location[0], location[1], size, size);
  };

  return { canvas, ctx, pixelAt };
}

async function canvasToPng(canvas: Canvas, outputPath: string) {
  const { promise, resolve } = Promise.withResolvers();
  const out = fs.createWriteStream(outputPath);
  out.on("finish", resolve);
  canvas.createPNGStream().pipe(out);
  return promise;
}

function generateImage(opts: {
  width: number;
  height: number;
  pixels: number[][];
  pixelColor: string;
}) {
  const { height, width, pixels, pixelColor } = opts;
  const { canvas, pixelAt } = useCanvas(width, height);

  for (const [X, Y] of pixels) {
    pixelAt([X + 1, Y + 1], 3, pixelColor);
  }
  return canvas;
}

const canvas = generateImage({
  width: 300,
  height: 300,
  pixelColor: "red",
  pixels: [
    [10, 10],
    [20, 20],
    [30, 30],
    [40, 40],
    [50, 50]
  ]
});

void canvasToPng(canvas, "generated_image.png");
