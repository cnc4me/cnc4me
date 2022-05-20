import React from "react";

import { Errors } from "../components/Errors";
import { MacroMemoryType } from "../types";
import { ViewHeading } from "./ViewHeading";

interface Props {
  memory: MacroMemoryType;
  errors?: string[];
}

export const DebugView: React.FC<Props> = ({ memory, errors }) => {
  const hasErrors = errors && errors.length > 0;

  return (
    <div className="container flex flex-col">
      <ViewHeading value="Debug" />
      <div className="flex flex-row">
        <div className="p-2 text-blue-400">
          <pre>{JSON.stringify(memory.toObject(), null, "  ")}</pre>
        </div>
        <div>
          {hasErrors && (
            <div className="px-4 py-2 bg-neutral-800">
              <Errors errors={errors} />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
