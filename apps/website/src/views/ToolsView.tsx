import { MacroMemory, range, ToolOffsetArray } from "@cnc4me/fanuc-macro-b";
import React, { useEffect, useState } from "react";

import { PagerButtons } from "../components/PagerButtons";
import { toFixed, zeroPad } from "../utils/helpers";
import { ViewHeading } from "./ViewHeading";

const DISPLAY_PRECISION = 4;

const REGISTERS_PER_PAGE = 24;

export const ToolsView: React.FC<{ memory: MacroMemory }> = ({ memory }) => {
  const [pageCount, setPageCount] = useState(1);
  const [values, setValues] = useState<ToolOffsetArray[]>([]);

  const pageLeft = () => setPageCount(pageCount - 1 === 0 ? 1 : pageCount - 1);
  const pageRight = () => setPageCount(pageCount + 1);

  const setValuesFromStart = (start: number) => {
    const registers = range(start, start + REGISTERS_PER_PAGE - 1);
    const offsets = registers.map(t => memory.getToolOffsetArray(t));
    setValues(offsets);
  };

  useEffect(() => {
    const zeroIndex = pageCount - 1;
    const offset = REGISTERS_PER_PAGE * zeroIndex;
    setValuesFromStart(1 + offset);
  }, [pageCount, memory]);

  return (
    <div className="container h-full flex flex-col">
      <ViewHeading value="Tools" />
      <div className="font-mono flex flex-col flex-grow pt-2">
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
                  {toFixed(lengthGeom, DISPLAY_PRECISION)}
                </div>
                <div className="flex-1 pr-1 text-right bg-white border-t border-l border-t-gray-700 border-l-gray-700">
                  {toFixed(lengthWear, DISPLAY_PRECISION)}
                </div>
                <div className="flex-1 pr-1 text-right bg-white border-t border-l border-t-gray-700 border-l-gray-700">
                  {toFixed(diamGeom, DISPLAY_PRECISION)}
                </div>
                <div className="flex-1 pr-1 text-right bg-white border-t border-l border-t-gray-700 border-l-gray-700">
                  {toFixed(diamWear, DISPLAY_PRECISION)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-shrink">
        <PagerButtons onPageLeft={pageLeft} onPageRight={pageRight} pageCount={pageCount} />
      </div>
    </div>
  );
};
