import { AxisLocations, MacroMemory } from "@cnc4me/fanuc-macro-b";

import { zeroPad } from "../utils/helpers";

type GroupCoordsTuple = [group: number, coords: AxisLocations];

const Coordinates: React.FC<{ group: number; locations: AxisLocations }> = ({ group, locations }) => {
  return (
    <div className="flex flex-row mb-1">
      <div className="flex flex-col">
        <div className="text-blue-400">{zeroPad(group - 53, 3)}</div>
        <div className="text-blue-400">{group === 53 ? "EXT" : `G${group}`}</div>
      </div>

      <div className="flex flex-col flex-grow pr-10">
        {Object.entries(locations).map(([axis, value]) => {
          return (
            <div className="flex flex-row">
              <div className="w-12 pt-px pr-3 text-right text-violet-100">{axis}</div>
              <div className="flex-grow pl-1 border-t border-l bg-violet-100 border-l-black border-t-black">
                {value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function WorkCoordinates({ memory }: { memory: MacroMemory }) {
  // const [pageCount, setPageCount] = useState(1);

  const leftCol: GroupCoordsTuple[] = [53, 54, 55, 56].map(g => [g, memory.getAxisLocations(g)]);
  const rightCol: GroupCoordsTuple[] = [57, 58, 59].map(g => [g, memory.getAxisLocations(g)]);

  return (
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
            return <Coordinates group={group} locations={coords} />;
          })}
        </div>
        <div>
          {rightCol.map(([group, coords]) => {
            return <Coordinates group={group} locations={coords} />;
          })}
        </div>
      </div>
    </div>
  );
}
