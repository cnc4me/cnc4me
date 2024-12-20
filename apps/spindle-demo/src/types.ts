export type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

export type DrawProp = {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
};
