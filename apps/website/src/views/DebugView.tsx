import { MacroMemory } from "@cnc4me/fanuc-macro-b";
import lzstring from "lz-string";
import React, { useEffect, useState } from "react";

import { Errors } from "../components/Errors";
import { ViewHeading } from "./ViewHeading";

export const DebugView: React.FC<{ editorContents: string; memory: MacroMemory; errors: string[] }> = ({
  editorContents,
  memory,
  errors
}) => {
  const [encodedInput, setEncodedInput] = useState("");

  useEffect(() => {
    const encoded = lzstring.compressToEncodedURIComponent(editorContents);
    setEncodedInput(encoded);
  });

  return (
    <div className="container flex flex-col">
      <ViewHeading value="Debug" />
      <div className="flex flex-row">
        <div className="p-2 text-blue-400">
          <pre>{JSON.stringify(memory.toObject(), null, "  ")}</pre>
        </div>
        <div className="border-purple-500 border p-2">
          <div className="font-mono text-purple-500 break-all">{encodedInput}</div>
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
