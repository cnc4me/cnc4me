import { MacroMemory, MacroValueArray } from "@cnc4me/fanuc-macro-b";
import { useEffect, useState } from "react";

import { ValueTable } from "../components/ValueTable";
import { ViewHeading } from "./ViewHeading";

export const MacroTab: React.FC<{ memory: MacroMemory }> = ({ memory }) => {
  const [pageCount, setPageCount] = useState(1);
  const [leftCol, setLeftCol] = useState<MacroValueArray>([]);
  const [rightCol, setRightCol] = useState<MacroValueArray>([]);

  const pageLeft = () => setPageCount(pageCount - 1 === 0 ? 1 : pageCount - 1);
  const pageRight = () => setPageCount(pageCount + 1);

  const sliceRegisters = () => {
    const macros = memory.toArray({ includeUnset: true });
    const offset = 20;

    if (pageCount === 1) {
      const start = offset * (pageCount - 1);
      const end = start + offset;
      const left = macros.slice(start, end);
      const right = macros.slice(end, end + 13);

      setLeftCol(left);
      setRightCol(right);
    } else {
      // eslint-disable-next-line prettier/prettier
      const start = 33 + (offset * (pageCount - 2));
      const end = start + offset;
      const left = macros.slice(start, end);
      const right = macros.slice(end, end + offset);

      setLeftCol(left);
      setRightCol(right);
    }
  };

  useEffect(() => {
    sliceRegisters();
  }, [pageCount, memory]);

  return (
    <div className="container">
      <ViewHeading value="Macro Variables" />
      <div className="grid grid-flow-row grid-cols-2">
        <div className="">
          <ValueTable macros={leftCol} />
        </div>
        <div className="">
          <ValueTable macros={rightCol} />
        </div>
      </div>
      <div className="flex flex-row justify-center py-4">
        <div className="">
          <button
            onClick={pageLeft}
            disabled={pageCount === 1}
            className="w-32 py-2 text-white border-2 rounded-lg border-violet-600 bg-violet-700 disabled:text-gray-400 disabled:border-gray-600 disabled:bg-gray-500"
          >
            &laquo; Page
          </button>
        </div>
        <div className="px-8 py-2 text-white">
          Page <span className="text-violet-300">{pageCount}</span>
        </div>
        <div className="">
          <button
            onClick={pageRight}
            className="w-32 py-2 text-white border-2 rounded-lg border-violet-600 bg-violet-700"
          >
            Page &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};
