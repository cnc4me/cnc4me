import { useCodeMirror } from "@uiw/react-codemirror";
import React, { useEffect, useRef, useState } from "react";

import { evaluate, interpreter } from "../src";

export default function App() {
  const example = `#1=[1+2]*3` + "\n".repeat(9);

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
    <div className="flex flex-row h-screen bg-zinc-800">
      <div className="flex flex-col w-1/3">
        <div className="grow" ref={editor} />
      </div>
      <div className="grow font-mono bg-zinc-900 p-5">
        {macros.map(macro => {
          return (
            !isNaN(macro[1]) && (
              <p key={macro[0]} className="text-xl text-indigo-600">
                #{macro[0]}= {macro[1]}
              </p>
            )
          );
        })}
      </div>
    </div>
  );
}
