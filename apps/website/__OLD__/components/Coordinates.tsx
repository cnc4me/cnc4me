import { WorkCoordinateArray, zeroPad } from "@cnc4me/fanuc-macro-b";

export const Coordinates: React.FC<{ group: number; locations: WorkCoordinateArray }> = ({ group, locations }) => {
  return (
    <div className="flex flex-row mb-1">
      <div className="flex flex-col">
        <div className="text-blue-400">{zeroPad(group - 53, 3)}</div>
        <div className="text-blue-400">{group === 53 ? "EXT" : `G${group}`}</div>
      </div>

      <div className="flex flex-col flex-grow pr-10">
        {locations.map((value, axisNum) => {
          return (
            <div key={axisNum} className="flex flex-row">
              <div className="w-12 pt-px pr-3 text-right text-violet-100">{[..."XYZB"][axisNum]}</div>
              <div className="flex-grow pl-1 border-t border-l bg-violet-100 border-l-black border-t-black">
                {String(value)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
