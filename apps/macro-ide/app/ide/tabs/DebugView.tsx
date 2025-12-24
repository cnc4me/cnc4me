import { Errors } from "~/components/Errors";
import { ViewHeading } from "~/components/ViewHeading";
import { useMacroRuntime } from "~/hooks";

export default function DebugView() {
  const runtime = useMacroRuntime();

  return (
    <div className="container flex flex-col">
      <ViewHeading value="Debug" />
      <div className="flex flex-row">
        <div className="p-2 text-blue-400">
          <pre>{JSON.stringify(runtime.Memory.toObject(), null, "  ")}</pre>
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
}
