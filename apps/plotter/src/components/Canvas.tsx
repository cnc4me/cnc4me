import React, { useCallback, useEffect, useRef } from "react";

import type { CanvasProps, DrawProp } from "../types";

function Canvas(props: CanvasProps & DrawProp) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { draw, ...rest } = props;

  // Resize canvas dimensions based on its parent's size
  const resizeCanvas = useCallback(() => {
    console.log("resizing");
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const { clientWidth, clientHeight } = parent;

    // Update the canvas resolution
    canvas.width = clientWidth;
    canvas.height = clientHeight;

    const context = canvas.getContext("2d");
    if (context && draw) {
      draw(context);
    }
  }, [draw]);

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
}

export default Canvas;
