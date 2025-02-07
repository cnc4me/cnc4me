import React, { useCallback, useEffect, useRef } from "react";

import { drawGrid } from "../grid";

import type { AppState } from "./reducer";

export type Dimensions = { width: number; height: number };

export type CanvasProps = {
  state: AppState;
  onCanvasResize: (dims: Dimensions) => void;
} & React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

const Canvas: React.FC<CanvasProps> = ({
  state,
  onCanvasResize,
  ...rest // This needs to be only CanvasHTMLAttributes
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = (ctx: CanvasRenderingContext2D) => {
    // const { width, height } = ctx.canvas;
    // ctx.clearRect(0, 0, width, height);
    // console.log("drawing", shapes);
    state.shapes.forEach(shape => {
      if (shape.type === "line") {
        const { x1, y1, x2, y2, color, strokeWidth } = shape;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color ?? state.lineColor;
        ctx.lineWidth = strokeWidth ?? state.lineWidth;
        ctx.stroke();
      }
    });
  };

  const griddyDraw = (ctx: CanvasRenderingContext2D) => draw(drawGrid(ctx));

  // Resize canvas dimensions based on its parent's size
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const { clientWidth, clientHeight } = parent;

    // Update the canvas resolution
    canvas.width = clientWidth;
    canvas.height = clientHeight;

    onCanvasResize({ width: clientWidth, height: clientHeight });

    const context = canvas.getContext("2d");
    if (context) {
      griddyDraw(context);
    }
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (context) {
      griddyDraw(context);
    }
  }, [state.shapes]);

  // Hook to handle window resize
  useEffect(() => {
    // Resize on mount
    resizeCanvas();

    // Add window resize listener
    window.addEventListener("resize", resizeCanvas);
    return () => {
      // Cleanup listener on unmount
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%" }}
      {...rest}
    />
  );
};

export default Canvas;
