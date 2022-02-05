import { useCodeMirror } from "@uiw/react-codemirror";
import React, { useEffect, useRef, useState } from "react";

import { evaluate, interpreter } from "../src";

const example = [
  "#1=5",
  "#2=[#1+2]*3",
  "#3=#2/#1",
  "#4=[4*#2]-3",
  "#5=[6+#3+#2]/[#4-#2]",
  "",
  "",
  ""
].join("\n");

export default function App() {
  const editor = useRef();
  const [macros, setMacros] = useState<[number, number][]>([]);

  const process = code => {
    evaluate(code);
    const macros = interpreter.getMacros();
    setMacros(Array.from(macros));
  };

  const { setContainer } = useCodeMirror({
    container: editor.current,
    theme: "dark",
    height: "100%",
    minHeight: "100%",
    maxHeight: "100%",
    // extensions: [javascript()],
    value: example,
    onChange: value => {
      process(value);
    }
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
      process(example);
    }
  }, [editor.current]);

  return (
    <div className="flex flex-col bg-violet-900">
      <div className="font-bold text-violet-300">
        <h1 className="text-2xl py-2 pl-4">Fanuc Macro B Playground</h1>
      </div>
      <div className="flex flex-row h-screen bg-neutral-800">
        <div className="flex flex-col w-1/3">
          <div className="grow" ref={editor} />
        </div>
        <div className="grow font-mono bg-neutral-900 p-5">
          <table className="table-auto">
            <thead>
              <tr className="text-xl text-violet-400">
                <th className="text-left w-32">Macro #</th>
                <th className="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {macros.map(macro => {
                return (
                  !isNaN(macro[1]) && (
                    <tr key={macro[0]} className="text-xl text-violet-600">
                      <td>#{macro[0]}</td>
                      <td>{macro[1]}</td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
