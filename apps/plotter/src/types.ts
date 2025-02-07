import * as CSS from "csstype";

type CssColor = CSS.Property.Color;

export { CssColor };

export type ShapeType = "line" | "arc";

export type IPosition = {
  x: number;
  y: number;
};

export type IStroke = {
  color: string;
  strokeWidth: number;
};

export type IShape = IStroke & {
  type: ShapeType;
};

export interface Line extends Partial<IShape> {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Arc extends Partial<IShape> {
  type: "arc";
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
}

export type Shapes = Line | Arc;
