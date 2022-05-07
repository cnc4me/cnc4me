import { AxisLocations, zeroPad } from "@cnc4me/fanuc-macro-b";

export const Coordinates: React.FC<{ group: number; locations: AxisLocations }> = ({ group, locations }) => {
  return (
    <div className="flex flex-row mb-1">
      <div className="flex flex-col">
        <div className="text-blue-400">{zeroPad(group - 53, 3)}</div>
        <div className="text-blue-400">{group === 53 ? "EXT" : `G${group}`}</div>
      </div>

      <div className="flex flex-col flex-grow pr-10">
        {Object.entries(locations).map(([axis, value]) => {
          return (
            <div key={axis} className="flex flex-row">
              <div className="w-12 pt-px pr-3 text-right text-violet-100">{axis}</div>
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
