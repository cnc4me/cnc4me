import { useEffect, useState } from "react";
import { PagerButtons } from "~/components/PagerButtons";
import { ValueTable } from "~/components/ValueTable";
import { ViewHeading } from "~/components/ViewHeading";
import { useMacroRuntime } from "~/hooks";
import type { MacroValueArray } from "@cnc4me/fanuc-macro-b";

export default function MacroView() {
  const runtime = useMacroRuntime();
  const memory = runtime.Memory;
  const [pageCount, setPageCount] = useState(1);
  const [leftCol, setLeftCol] = useState<MacroValueArray>([]);
  const [rightCol, setRightCol] = useState<MacroValueArray>([]);

  const pageLeft = () => setPageCount(pageCount - 1 === 0 ? 1 : pageCount - 1);
  const pageRight = () => setPageCount(pageCount + 1);

  useEffect(() => {
    console.log(memory.toJSON());
  }, [memory]);

  useEffect(() => {
    const macros = runtime.Memory.toArray({ includeUnset: true }).slice(
      0,
      1000,
    );
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
      const start = 33 + offset * (pageCount - 2);
      const end = start + offset;
      const left = macros.slice(start, end);
      const right = macros.slice(end, end + offset);

      setLeftCol(left);
      setRightCol(right);
    }
  }, [pageCount, runtime.Memory]);

  return (
    <div className="container flex flex-col h-full">
      <ViewHeading value="Macro Variables" />
      <div className="grow grid grid-flow-row grid-cols-2">
        <div className="">
          <ValueTable macros={leftCol} />
        </div>
        <div className="">
          <ValueTable macros={rightCol} />
        </div>
      </div>
      <div>
        <PagerButtons
          pageCount={pageCount}
          onPageLeft={pageLeft}
          onPageRight={pageRight}
        ></PagerButtons>
      </div>
    </div>
  );
}
