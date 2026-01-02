import { Coordinates } from "~/components/Coordinates";
import { ViewHeading } from "~/components/ViewHeading";
import { useMacroRuntime } from "~/hooks";
import type { WorkCoordinateArray } from "@cnc4me/fanuc-macro-b";

type GroupCoordsTuple = [group: number, coords: WorkCoordinateArray];

export default function OffsetView() {
  const runtime = useMacroRuntime();

  const leftCol: GroupCoordsTuple[] = [53, 54, 55, 56].map((g) => [
    g,
    runtime.Memory.getWorkCoordinateArray(g),
  ]);
  const rightCol: GroupCoordsTuple[] = [57, 58, 59].map((g) => [
    g,
    runtime.Memory.getWorkCoordinateArray(g),
  ]);

  return (
    <div className="container flex flex-col h-full font-mode-nine">
      <ViewHeading value="Work Coordinates" />
      <div className="grid grid-flow-row grid-cols-2 px-4 pt-2">
        <div>
          <div className="flex flex-row text-violet-100">
            <p className="w-12">NO.</p>
            <div className="pl-1">DATA</div>
          </div>
          {leftCol.map(([group, coords]) => {
            return <Coordinates key={group} group={group} locations={coords} />;
          })}
        </div>
        <div>
          <div className="flex flex-row text-violet-100">
            <p className="w-12">NO.</p>
            <div className="pl-1">DATA</div>
          </div>
          {rightCol.map(([group, coords]) => {
            return <Coordinates key={group} group={group} locations={coords} />;
          })}
        </div>
      </div>
    </div>
  );
}
