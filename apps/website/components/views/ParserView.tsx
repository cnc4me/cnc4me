import React, { useMemo } from "react";

import { useMacroRuntime } from "../../hooks";
import { Errors } from "../Errors";
import { ViewHeading } from "../ViewHeading";

interface Props {
  // errors?: string[];
}

export const ParserView: React.FC<Props> = () => {
  const runtime = useMacroRuntime();
  const memory = runtime.Memory.toObject();

  return (
    <div className="container flex flex-col">
      <ViewHeading value="Parser" />
      <div className="flex flex-row">
        <div className="p-2 text-blue-400">
          <h3 className="text-2xl">Internal Memory Contents</h3>
          <pre>{JSON.stringify(memory, null, 2)}</pre>
        </div>
        <div>
          {runtime.hasErrors && (
            <div className="px-4 py-2 bg-neutral-800">
              <Errors errors={runtime.getErrorMessages()} />{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
