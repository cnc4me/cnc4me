export function drawGrid(
  ctx: CanvasRenderingContext2D
): CanvasRenderingContext2D {
  const { width, height } = ctx.canvas;
  const gridSize = 20; // Define cell size in pixels

  // Calculate the center of the canvas
  const centerX = width / 2;
  const centerY = height / 2;

  // Set stroke style once before drawing
  ctx.strokeStyle = "#efefef";
  ctx.lineWidth = 1;

  // Draw vertical lines (relative to center)
  for (let x = centerX; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let x = centerX; x >= 0; x -= gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Draw horizontal lines (relative to center)
  for (let y = centerY; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  for (let y = centerY; y >= 0; y -= gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  return ctx;
}
