import { MacroMemory } from "@cnc4me/fanuc-macro-b";
import lzstring from "lz-string";
import React from "react";

import { Errors } from "../components/Errors";
import { useExampleCode } from "../hooks";
import { ViewHeading } from "./ViewHeading";

export const DebugView: React.FC<{ memory: MacroMemory; errors: string[] }> = ({ memory, errors }) => {
  const example = useExampleCode();

  return (
    <div className="container flex flex-col">
      <ViewHeading value="Debug" />
      <div className="flex flex-row">
        <div className="p-2 text-blue-400">
          <pre>{JSON.stringify(memory.toObject(), null, "  ")}</pre>
        </div>
        <div className="border-purple-500 border p-2">
          <div className="font-mono text-purple-500 break-all">{lzstring.compressToEncodedURIComponent(example)}</div>
        </div>
        <div>
          {errors.length > 0 ? (
            <div className="px-4 py-2 bg-neutral-800">
              <Errors errors={errors} />{" "}
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};
