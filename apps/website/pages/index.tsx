import { RuntimeErrors } from "@cnc4me/fanuc-macro-b";
import { OnChange, OnMount } from "@monaco-editor/react";
import { useRouter } from "next/router";
// import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { match } from "ts-pattern";

import { MacroEditor } from "../components/editor/MacroEditor";
import { ErrorPane } from "../components/ErrorPane";
import Layout from "../components/layout";
import {
  DebugView,
  HomeView,
  MacroView,
  OffsetView,
  ToolsView
} from "../components/views";
import { debounce } from "../lib";
import {
  DEFAULT_TAB_ON_PAGE_LOAD,
  EDITOR_ON_CHANGE_TIMEOUT
} from "../lib/constants";
import {
  useContentSearchParam,
  useEditorTheme,
  useExampleCode,
  useMacroRuntime,
  useTabSearchParam
} from "../lib/hooks";
import {
  MacroMemoryType,
  MonacoCodeEditorType,
  ParsedLineDataType,
  ViewStr
} from "../lib/types";

const tabs: ViewStr[] = ["home", "macros", "offsets", "tools"];

export default function App(): JSX.Element {
  const router = useRouter();
  const runtime = useMacroRuntime();
  const editorRef = useRef<MonacoCodeEditorType>();
  const getEditorContents = () => String(editorRef.current?.getValue());
  const setEditorContents = (input: unknown) =>
    editorRef.current?.setValue(String(input));

  const { getContentParam, setContentParam } = useContentSearchParam();

  // If there is `content=<STRING>` in the URL, use it, or if not, use the example
  const [initialContent, setInitialContent] = useState<string>(
    useExampleCode()
  );

  const { getTabParam, setTabParam } = useTabSearchParam(tabs);
  const initialTabOnLoad = getTabParam(DEFAULT_TAB_ON_PAGE_LOAD);

  const [activeTab, setActiveTab] = useState<ViewStr>(initialTabOnLoad);
  const [editorTheme] = useEditorTheme("gcode-dark");

  const [errors, setErrors] = useState<RuntimeErrors[]>([]);
  const [memory, setMemory] = useState<MacroMemoryType>(runtime.Memory);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [interpreterResult, setInterpreterResult] = useState<
    ParsedLineDataType[]
  >([]);

  const CurrentView: React.FC<{ activeTab: ViewStr }> = ({ activeTab }) =>
    match<ViewStr>(activeTab)
      .with("home", () => <HomeView />)
      .with("debug", () => <DebugView memory={memory} />)
      .with("tools", () => <ToolsView memory={memory} />)
      .with("macros", () => <MacroView memory={memory} />)
      .with("offsets", () => <OffsetView memory={memory} />)
      .otherwise(() => <h1 className="p-10 text-red-500">ERROR</h1>);

  const parseEditorContent = () => {
    const content = getEditorContents();

    try {
      const parsedLines = runtime.evalLines(content);
      setInterpreterResult(parsedLines);
      setMemory(runtime.Memory);
      // setErrors(runtime.getErrors());
    } catch (err) {
      console.error(err);
    }
  };

  const onEditorMount: OnMount = editor => {
    editorRef.current = editor;
  };

  const onEditorChange: OnChange = debounce((input?: string) => {
    if (input !== "") {
      setContentParam(input);
    }

    parseEditorContent();
  }, EDITOR_ON_CHANGE_TIMEOUT);

  const handleTabClick = (tabName: ViewStr) => {
    setTabParam(tabName);
    setActiveTab(tabName);
  };

  const handleResetButton = () => {
    setEditorContents("");
    setContentParam("");
    setErrors([]);
  };

  const handleRunButton = () => {
    parseEditorContent();
  };

  useEffect(() => {
    if (router.isReady) {
      setInitialContent(getContentParam() ?? useExampleCode());
      setActiveTab(getTabParam("home"));
      parseEditorContent();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      const content = getContentParam();

      if (content !== "") {
        setEditorContents(content);
      }
    }
  }, [editorRef.current, router.isReady]);

  return (
    <>
      <Layout>
        <header className="flex flex-row font-bold text-purple-200 bg-violet-900">
          <div className="flex-grow">
            <h1 className="py-2 pl-4 text-2xl">Macro Playground</h1>
          </div>
          <div>
            {tabs.map(tabName => {
              const className = `w-28 h-12 py-2 text-white ${
                activeTab === tabName
                  ? "bg-neutral-900 rounded-tr-md rounded-tl-md"
                  : "bg-violet-900"
              }`;

              return (
                <button
                  key={tabName}
                  onClick={() => handleTabClick(tabName)}
                  className={className}
                >
                  {tabName.toUpperCase()}
                </button>
              );
            })}
          </div>
        </header>

        <main className="flex flex-row flex-grow">
          <section className="flex flex-col w-1/2 border-r border-r-purple-600">
            <div className="flex border-b border-b-gray-900 bg-[#1E1E1E]">
              <p className="px-6 py-3 text-sm italic text-violet-100">
                {`\u00BB`} Try editing some of the values!
              </p>
              <div className="flex-grow"></div>

              <div className="flex mr-2">
                <button
                  onClick={() => handleResetButton()}
                  className="px-3 my-1.5 text-white rounded-l-md bg-red-700"
                >
                  {`Reset`}
                </button>
                <button
                  onClick={() => handleRunButton()}
                  className="px-3 my-1.5 text-white rounded-r-md bg-green-600"
                >
                  {`Run \u2bc8`}
                </button>
              </div>
            </div>
            <MacroEditor
              theme={editorTheme}
              contents={initialContent}
              onMount={onEditorMount}
              onChange={onEditorChange}
            />
            {/* <MacroEditor contents={editorBuffer} theme={editorTheme} onMount={onEditorMount} onChange={onEditorChange} /> */}
          </section>
          <aside className="flex-1 flex-grow min-h-100 bg-neutral-800">
            <CurrentView activeTab={activeTab} />
          </aside>
        </main>
        <ErrorPane errors={errors} />
      </Layout>
    </>
  );
}
