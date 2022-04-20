import { zeroPad } from "../utils/helpers";

export const Errors = ({ errors }: { errors: string[] }) => {
  return (
    <div className="">
      <h1 className="pb-1 text-xl font-bold text-violet-400">Errors:</h1>
      {errors.map((error, i) => {
        const errNum = zeroPad(i + 1, 2);

        return (
          <div key={errNum} className="flex flex-row font-mono text-xs">
            <div className="font-bold text-red-400">E{errNum}:</div>
            <div className="text-red-600">
              <pre>{JSON.stringify(error, null, " ")}</pre>
            </div>
          </div>
        );
      })}
    </div>
  );
};
