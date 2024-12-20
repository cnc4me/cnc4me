import React from "react";

import type { CanvasProps, DrawProp } from "./types";

function Canvas(props: CanvasProps & DrawProp) {
  const { draw, ...rest } = props;

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    let frameCount = 0;
    let animationFrameId = NaN;

    //Our draw came here
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} {...rest} />;
}

export default Canvas;
