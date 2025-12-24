import { zeroPad } from "../lib/helpers";
import type { WorkCoordinateArray } from "@cnc4me/fanuc-macro-b";

interface Props {
  group: number;
  locations: WorkCoordinateArray;
}

export default function Coordinates({ group, locations }: Props) {
  return (
    <div className="flex flex-row mb-1">
      <div className="flex flex-col text-blue-400">
        <p>{zeroPad(group - 53, 3)}</p>
        <p>{group === 53 ? "EXT" : `G${group}`}</p>
      </div>

      <div className="flex flex-col grow pr-10">
        {locations.map((value, axisNum) => {
          const axis = "XYZB".split("")[axisNum];
          return (
            <div key={axis} className="flex flex-row">
              <div className="w-12 pt-px pr-3 text-right text-violet-100">
                {axis}
              </div>
              <div className="grow pl-1 border-t border-l bg-slate-700 border-l-black border-t-black">
                {value ? value.toPrecision(4) : 0}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
