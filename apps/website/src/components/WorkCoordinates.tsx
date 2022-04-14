import { MacroMemory } from "@cnc4me/fanuc-macro-b";

import { zeroPad } from "../utils/helpers";

export default function WorkCoordinates({ memory }: { memory: MacroMemory }) {
  const groups = [53, 54, 55, 56, 57, 58, 59];

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
        {groups.map(groupNum => {
          const coords = memory.getWorkCoordinates(groupNum);

          return (
            <div className="flex flex-row mb-1">
              <div className="flex flex-col">
                <div className="text-blue-400">{zeroPad(groupNum - 53, 3)}</div>
                <div className="text-blue-400">{groupNum === 53 ? "EXT" : `G${groupNum}`}</div>
              </div>

              <div className="flex flex-col flex-grow pr-10">
                {Object.entries(coords).map(([axis, value]) => {
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
        })}
      </div>
    </div>
  );
}
