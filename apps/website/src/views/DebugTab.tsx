import { MacroMemory } from "@cnc4me/fanuc-macro-b";
import React from "react";

import { Errors } from "../components/Errors";

export const DebugTab: React.FC<{ memory: MacroMemory; errors: string[] }> = ({ memory, errors }) => {
  return (
    <div className="container">
      <h1 className="px-2 py-3 text-3xl border-b shadow-neutral-800 bg-neutral-800 border-b-violet-600 text-violet-500">
        Debug
      </h1>
      <div className="p-2 text-blue-400">
        <pre>{JSON.stringify(memory.toObject(), null, "  ")}</pre>
      </div>
      <div>
        {errors.length > 0 ? (
          <div className="px-4 py-2 bg-neutral-800">
            <Errors errors={errors} />{" "}
          </div>
        ) : undefined}
      </div>
    </div>
  );
};
