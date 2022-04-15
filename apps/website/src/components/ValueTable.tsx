import { MacroValueArray } from "@cnc4me/fanuc-macro-b";

import { zeroPad } from "../utils/helpers";

export const ValueTable: React.FC<{ macros: MacroValueArray }> = ({ macros }) => (
  <div className="flex flex-col gap-1 px-4 pt-2 font-mono">
    <div className="flex flex-row">
      <div className="w-12 text-violet-100">NO.</div>
      <div className="pl-1 text-violet-100">DATA</div>
    </div>

    {macros.map(macro => {
      return (
        <div key={macro[0]} className="flex flex-row">
          <div className="w-12 pt-px text-blue-400">#{zeroPad(macro[0], 4)}</div>
          <div className="flex-grow pl-1 border-t border-l bg-violet-100 border-l-black border-t-black">
            {macro[1].toFixed(10)}
          </div>
        </div>
      );
    })}
  </div>
);
