import { MacroMemory } from "@cnc4me/fanuc-macro-b";
import React from "react";

import { Errors } from "../components/Errors";
import { ViewHeading } from "./ViewHeading";

export const DebugView: React.FC<{ memory: MacroMemory; errors: string[] }> = ({ memory, errors }) => {
  return (
    <div className="container">
      <ViewHeading value="Debug" />
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
