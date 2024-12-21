import React from "react";

function Canvas(props: CanvasProps & DrawProp) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { draw, ...rest } = props;

  React.useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;

    let frameCount = 0;
    let animationFrameId = NaN;

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

export type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

export type DrawProp = {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
};
