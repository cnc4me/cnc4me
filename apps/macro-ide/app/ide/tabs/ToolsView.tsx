import { useEffect, useState } from "react";
import { PagerButtons } from "~/components/PagerButtons";
import { ViewHeading } from "~/components/ViewHeading";
import { useMacroRuntime } from "~/hooks";
import { range, toFixed, zeroPad } from "~/lib/helpers";
import type { ToolOffsetArray } from "@cnc4me/fanuc-macro-b";

const displayPrecision = 4;
const registersPerPage = 24;

export default function ToolsView() {
  const runtime = useMacroRuntime();
  const memory = runtime.Memory;

  const [pageCount, setPageCount] = useState(1);
  const [values, setValues] = useState<ToolOffsetArray[]>([]);

  const pageLeft = () => setPageCount(pageCount - 1 === 0 ? 1 : pageCount - 1);
  const pageRight = () => setPageCount(pageCount + 1);

  const setValuesFromStart = (start: number) => {
    const registers = range(start, start + registersPerPage - 1);
    const offsets = registers.map((t) => memory.getToolOffsetArray(t));
    setValues(offsets);
  };

  useEffect(() => {
    const zeroIndex = pageCount - 1;
    const offset = registersPerPage * zeroIndex;
    setValuesFromStart(1 + offset);
  }, [pageCount, memory]);

  const ValueOutputField = ({ value = 0 }) => (
    <div className="flex-1 pr-1 text-right border-t border-l bg-slate-700 border-l-black border-t-black">
      {toFixed(value, displayPrecision)}
    </div>
  );

  return (
    <div className="container flex flex-col h-full font-mode-nine">
      <ViewHeading value="Tools" />
      <div className="flex flex-col flex-grow pt-2">
        <div className="flex flex-row justify-around ml-12 mr-4">
          <div className="text-blue-400">(LENGTH)</div>
          <div className="text-blue-400">(RADIUS)</div>
        </div>
        <div className="flex flex-row mr-4 text-center">
          <div className="flex-shrink pl-5 text-blue-400">NO.</div>
          <div className="flex flex-row flex-grow">
            <div className="flex-grow text-blue-400">GEOM</div>
            <div className="flex-grow text-blue-400">WEAR</div>
            <div className="flex-grow text-blue-400">GEOM</div>
            <div className="flex-grow text-blue-400">WEAR</div>
          </div>
        </div>
        <div className="flex flex-col px-4">
          {values.map((offset) => {
            const [index, lengthGeom, lengthWear, diamGeom, diamWear] = offset;

            return (
              <div key={zeroPad(offset[0], 3)} className="flex gap-1">
                <div className="flex-shrink text-blue-400">
                  {zeroPad(index, 3)}
                </div>
                <ValueOutputField value={lengthGeom} />
                <ValueOutputField value={lengthWear} />
                <ValueOutputField value={diamGeom} />
                <ValueOutputField value={diamWear} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-shrink">
        <PagerButtons
          onPageLeft={pageLeft}
          onPageRight={pageRight}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}
