/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { ParsedLineData } from "@cnc4me/fanuc-macro-b";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { match } from "ts-pattern";

import { TabMenu } from "./components/TabMenu";
import { configureMonaco } from "./handlers/configureMonaco";
import { useEditorTheme, useExampleCode, useMacroRuntime } from "./hooks";
import { EditorOptions, MonacoEditor, TabStr } from "./types";
import { DebugTab, MacroTab, OffsetTab, ToolsTab } from "./views";

export default function App() {
  const example = useExampleCode();
  const editorRef = useRef<MonacoEditor>();
  const [editorTheme, _themeSetters] = useEditorTheme("gcode-dark");
  const [editorOptions, _setEditorOptions] = useState<EditorOptions>({
    minimap: { enabled: false }
  });

  const [runtime] = useMacroRuntime();

  runtime.onError(errors => {
    console.log(errors);
  });

  const [interpreterResult, setInterpreterResult] = useState<ParsedLineData[]>([]);

  const [errors, setErrors] = useState<string[]>([]);

  const tabs: TabStr[] = ["debug", "macros", "offsets", "tools"];
  const [activeTab, setActiveTab] = useState<TabStr>("tools");

  const parseGCode = (code: string) => {
    const parsedLines = runtime.evalLines(code);
    setInterpreterResult(parsedLines);
  };

  const handleEditorDidMount: OnMount = editor => {
    editorRef.current = editor;
    parseGCode(example);
  };

  const handleEditorChange: OnChange = (value?: string) => {
    parseGCode(String(value));
  };

  useEffect(() => {
    console.log(editorRef.current?.getValue());
  }, [runtime.Memory]);

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-neutral-800">
      <div className="flex flex-row font-bold text-purple-200 bg-violet-900">
        <div className="flex-grow">
          <h1 className="py-2 pl-4 text-2xl">Fanuc Macro B Playground</h1>
        </div>
        <div>
          <TabMenu tabActivator={setActiveTab} tabs={tabs} activeTab={activeTab} />
        </div>
      </div>
      <div className="flex flex-row flex-grow">
        <div className="flex flex-col w-1/2 border-r border-r-purple-600">
          <p
            className="px-6 py-3 text-sm italic border-b border-b-gray-900 text-violet-100"
            style={{ backgroundColor: "#1E1E1E" }}
          >
            {`\u00BB`} Try editing some of the values!
          </p>
          <Editor
            theme={editorTheme}
            defaultLanguage="gcode"
            options={editorOptions}
            defaultValue={example}
            beforeMount={configureMonaco}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="flex flex-col flex-grow bg-neutral-800">
          {match<TabStr>(activeTab)
            .with("offsets", () => {
              return <OffsetTab memory={runtime.Memory} />;
            })
            .with("macros", () => {
              return <MacroTab memory={runtime.Memory} />;
            })
            .with("tools", () => {
              return <ToolsTab memory={runtime.Memory} />;
            })
            .with("debug", () => {
              return <DebugTab memory={runtime.Memory} errors={errors} />;
            })
            .otherwise(() => {
              return <h1 className="text-red-600">ERROR</h1>;
            })}
        </div>
      </div>

      <div className="flex flex-row content-center text-purple-100 border-t border-t-purple-600 bg-violet-900">
        <div className="p-2 text-sm">
          Made By{" "}
          <a className="text-purple-300 text-bold hover:text-white" href="https://github.com/kevinkhill">
            Kevin Hill
          </a>{" "}
          © 2022
        </div>
      </div>
    </div>
  );
}
