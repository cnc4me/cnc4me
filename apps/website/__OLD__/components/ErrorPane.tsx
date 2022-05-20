import { RuntimeErrors, zeroPad } from "@cnc4me/fanuc-macro-b";
import React from "react";

export const ErrorPane: React.FC<{ errors: RuntimeErrors[] }> = ({ errors }) => {
  return (
    <>
      {errors.length > 0 && (
        <div className="overflow-y-auto font-mono text-red-500 bg-black border-t border-t-purple-600">
          {errors.map((error, idx) => {
            const text = typeof error === "string" ? error : error?.message;
            return (
              <p className="mb-1 border-b border-red-500">
                <span className="py-1 pl-2 mr-4 text-white bg-red-500">E{zeroPad(idx, 4)}: </span>
                {text}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
};
