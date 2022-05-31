import React from "react";

import { useMacroRuntime } from "../../lib/hooks";
import { Errors } from "../Errors";
import { ViewHeading } from "./ViewHeading";

interface Props {
  errors?: string[];
}

export const DebugView: React.FC<Props> = ({ errors }) => {
  const runtime = useMacroRuntime();
  const hasErrors = errors && errors.length > 0;

  return (
    <div className="container flex flex-col">
      <ViewHeading value="Debug" />
      <div className="flex flex-row">
        <div className="p-2 text-blue-400">
          <pre>{JSON.stringify(runtime.Memory.toObject(), null, "  ")}</pre>
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
