import { MacroMemory, WorkCoordinateArray } from "@cnc4me/fanuc-macro-b";
import React from "react";

import { Coordinates } from "../Coordinates";
import { ViewHeading } from "./ViewHeading";

type GroupCoordsTuple = [group: number, coords: WorkCoordinateArray];

export const OffsetView: React.FC<{ memory: MacroMemory }> = ({ memory }) => {
  const leftCol: GroupCoordsTuple[] = [53, 54, 55, 56].map(g => [
    g,
    memory.getWorkCoordinateArray(g)
  ]);
  const rightCol: GroupCoordsTuple[] = [57, 58, 59].map(g => [
    g,
    memory.getWorkCoordinateArray(g)
  ]);

  return (
    <div className="container">
      <ViewHeading value="Work Coordinates" />
      <div className="flex flex-col">
        <div className="grid grid-flow-row grid-cols-2 px-4 pt-2 font-mono">
          <div className="flex flex-row">
            <div className="w-12 text-violet-100">NO.</div>
            <div className="pl-1 text-violet-100">DATA</div>
          </div>
          <div className="flex flex-row">
            <div className="w-12 text-violet-100">NO.</div>
            <div className="pl-1 text-violet-100">DATA</div>
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-2 px-4 pt-2 font-mono">
          <div>
            {leftCol.map(([group, coords]) => {
              return (
                <Coordinates key={group} group={group} locations={coords} />
              );
            })}
          </div>
          <div>
            {rightCol.map(([group, coords]) => {
              return (
                <Coordinates key={group} group={group} locations={coords} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
