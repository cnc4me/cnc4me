import { AxisLocations, MacroMemory } from "@cnc4me/fanuc-macro-b";
import React from "react";

import { Coordinates } from "../components/Coordinates";

type GroupCoordsTuple = [group: number, coords: AxisLocations];

export const OffsetTab: React.FC<{ memory: MacroMemory }> = ({ memory }) => {
  const leftCol: GroupCoordsTuple[] = [53, 54, 55, 56].map(g => [g, memory.getAxisLocations(g)]);
  const rightCol: GroupCoordsTuple[] = [57, 58, 59].map(g => [g, memory.getAxisLocations(g)]);

  return (
    <div className="container">
      <h1 className="px-2 py-3 text-3xl border-b shadow-neutral-800 bg-neutral-800 border-b-violet-600 text-violet-500">
        Work Coordinates
      </h1>
      <div className="flex flex-col">
        <div className="pb-4 border-t border-t-purple-600">
          <div className="container">
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
                  return <Coordinates key={group} group={group} locations={coords} />;
                })}
              </div>
              <div>
                {rightCol.map(([group, coords]) => {
                  return <Coordinates key={group} group={group} locations={coords} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
3;
