import { MacroMemory, ToolOffsetArray } from "@cnc4me/fanuc-macro-b";
import { useState } from "react";

import { intRange, toFixed, zeroPad } from "../utils/helpers";
import { ViewHeading } from "./ViewHeading";

export const ToolsTab: React.FC<{ memory: MacroMemory }> = ({ memory }) => {
  const [start, setStart] = useState(1);
  const [perPage, setPerPage] = useState(24);
  const [precision, setPrecision] = useState(4);

  const values = intRange(start, perPage).map(t => memory.getToolOffsetArray(t));

  return (
    <div className="container">
      <ViewHeading value="Tools" />
      <div className="font-mono flex flex-col flex-grow mt-2">
        <div className="flex flex-row justify-around ml-12 mr-4">
          <div className="text-blue-400">(LENGTH)</div>
          <div className="text-blue-400">(RADIUS)</div>
        </div>
        <div className="flex flex-row text-center mr-4">
          <div className="flex-shrink text-blue-400 pl-5">NO.</div>
          <div className="flex flex-row flex-grow">
            <div className="flex-grow text-blue-400">GEOM</div>
            <div className="flex-grow text-blue-400">WEAR</div>
            <div className="flex-grow text-blue-400">GEOM</div>
            <div className="flex-grow text-blue-400">WEAR</div>
          </div>
        </div>
        <div className="flex flex-col px-4">
          {values.map(offset => {
            const [index, lengthGeom, lengthWear, diamGeom, diamWear] = offset;

            return (
              <div key={zeroPad(offset[0], 3)} className="flex gap-1">
                <div className="flex-shrink text-blue-400">{zeroPad(index, 3)}</div>
                <div className="flex-1 pr-1 text-right bg-white border-t border-l border-t-gray-700 border-l-gray-700">
                  {toFixed(lengthGeom, precision)}
                </div>
                <div className="flex-1 pr-1 text-right bg-white border-t border-l border-t-gray-700 border-l-gray-700">
                  {toFixed(lengthWear, precision)}
                </div>
                <div className="flex-1 pr-1 text-right bg-white border-t border-l border-t-gray-700 border-l-gray-700">
                  {toFixed(diamGeom, precision)}
                </div>
                <div className="flex-1 pr-1 text-right bg-white border-t border-l border-t-gray-700 border-l-gray-700">
                  {toFixed(diamWear, precision)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
