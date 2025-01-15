import * as CSS from "csstype";

type CssColor = CSS.Property.Color;

export { CssColor };

export type ShapeType = "line" | "arc";

export interface Shape {
  type: ShapeType;
  color?: string;
  strokeWidth?: number;
}

export interface Line extends Shape {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Arc extends Shape {
  type: "arc";
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
}

export type Shapes = Line | Arc;

export type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

export type DrawProp = {
  draw(ctx: CanvasRenderingContext2D): void;
};
