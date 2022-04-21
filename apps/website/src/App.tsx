/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { MacroMemory, ParsedLineData } from "@cnc4me/fanuc-macro-b";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";

import { Footer } from "./Footer";
import { configureMonaco } from "./handlers/configureMonaco";
import { useEditorTheme, useExampleCode, useMacroRuntime } from "./hooks";
import { EditorOptions, MonacoEditor, TabStr } from "./types";
import { DebugView, MacroView, OffsetView, ToolsView } from "./views";

export default function App() {
  const example = useExampleCode();
  const runtime = useMacroRuntime();

  const editorRef = useRef<MonacoEditor>();
  const [editorTheme, _themeSetters] = useEditorTheme("gcode-dark");
  const [editorOptions, _setEditorOptions] = useState<EditorOptions>({
    minimap: { enabled: false }
  });

  const [memory, setMemory] = useState<MacroMemory>(runtime.Memory);
  const [interpreterResult, setInterpreterResult] = useState<ParsedLineData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  runtime.onError(errors => {
    console.log(errors);
  });

  const tabs: TabStr[] = ["macros", "offsets", "tools", "debug"];
  const [activeTab, setActiveTab] = useState<TabStr>("macros");

  const parseGCode = (code: string) => {
    const parsedLines = runtime.evalLines(code);
    setInterpreterResult(parsedLines);
    setMemory(runtime.Memory);
  };

  const onEditorMount: OnMount = editor => {
    editorRef.current = editor;
    parseGCode(example);
  };

  const onEditorChange: OnChange = (value?: string) => {
    parseGCode(String(value));
  };

  const onRunBtnClick = () => {
    const value = editorRef.current?.getValue();

    if (value) {
      parseGCode(String(value));
    }
  };

  const CurrentView: React.FC = () => {
    return activeTab === "offsets" ? (
      <OffsetView memory={memory} />
    ) : activeTab === "macros" ? (
      <MacroView memory={memory} />
    ) : activeTab === "tools" ? (
      <ToolsView memory={memory} />
    ) : activeTab === "debug" ? (
      <DebugView memory={memory} errors={errors} />
    ) : (
      <h1 className="text-red-600">ERROR</h1>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-neutral-800">
      <div className="flex flex-row font-bold text-purple-200 bg-violet-900">
        <div className="flex-grow">
          <h1 className="py-2 pl-4 text-2xl">Fanuc Macro B Playground</h1>
        </div>
        <div>
          {tabs.map(tabName => {
            return (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={`w-32 h-12 py-2 text-white ${
                  activeTab === tabName ? "bg-neutral-900 rounded-tr-md rounded-tl-md" : "bg-violet-900"
                }`}
              >
                {tabName.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row flex-grow">
        <div className="flex flex-col w-1/2 border-r border-r-purple-600">
          <div className="flex border-b border-b-gray-900 bg-[#1E1E1E]">
            <p className="px-6 py-3 text-sm italic text-violet-100">{`\u00BB`} Try editing some of the values!</p>
            <div className="flex-grow"></div>
            <button
              onClick={() => onRunBtnClick()}
              className="px-3 mr-2 my-1.5 text-white border-1 rounded-md border-violet-600 bg-violet-700"
            >
              Run {`\u2bc8`}
            </button>
          </div>
          <Editor
            theme={editorTheme}
            defaultLanguage="gcode"
            options={editorOptions}
            defaultValue={example}
            onMount={onEditorMount}
            onChange={onEditorChange}
            beforeMount={configureMonaco}
          />
        </div>
        <div className="flex flex-col flex-grow bg-neutral-800">
          <CurrentView />
        </div>
      </div>

      <div className="border-t border-t-purple-600">
        <Footer />
      </div>
    </div>
  );
}
