import React from "react";

import Canvas from "./Canvas";

import type { DrawProp } from "../types";

type PlotterProps = DrawProp & {
  width: number;
  height: number;
};

const Plotter: React.FC<PlotterProps> = ({ draw, width, height }) => {
  return (
    <Canvas
      draw={draw}
      width={width}
      height={height}
      style={{ backgroundColor: "ivory" }}
    ></Canvas>
  );
};

export default Plotter;
