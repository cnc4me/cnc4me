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
  MonacoCodeEditorType,
  ParsedLineDataType,
  ViewStr
} from "../lib/types";

const tabs: ViewStr[] = ["home", "macros", "offsets", "tools"];

let count = 1;
const __ = (where: string, ...rest: unknown[]) =>
  console.log(count++, `=> ${where}`, ...rest);

export default function App(): JSX.Element {
  const router = useRouter();
  const runtime = useMacroRuntime();
  const editorRef = useRef<MonacoCodeEditorType>();
  const getEditorContents = () => String(editorRef.current?.getValue());
  const setEditorContents = (input: unknown) =>
    editorRef.current?.setValue(String(input));

  const { getContentParam, setContentParam } = useContentSearchParam();
  const [initialContent, setInitialContent] = useState<string>(
    useExampleCode()
  );

  const { getTabParam, setTabParam } = useTabSearchParam(tabs);
  const initialTabOnLoad = getTabParam(DEFAULT_TAB_ON_PAGE_LOAD);

  const [activeTab, setActiveTab] = useState<ViewStr>(initialTabOnLoad);
  const [editorTheme] = useEditorTheme("gcode-dark");

  const [errors, setErrors] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [interpreterResult, setInterpreterResult] = useState<
    ParsedLineDataType[]
  >([]);

  const CurrentView: React.FC<{ activeTab: ViewStr }> = ({ activeTab }) =>
    match<ViewStr>(activeTab)
      .with("home", () => <HomeView />)
      .with("debug", () => <DebugView />)
      .with("tools", () => <ToolsView />)
      .with("macros", () => <MacroView />)
      .with("offsets", () => <OffsetView />)
      .otherwise(() => <h1 className="p-10 text-red-500">ERROR</h1>);

  const parseEditorContent = () => {
    __("parseEditorContent");
    const content = getEditorContents();

    try {
      const parsedLines = runtime.evalLines(content);
      setInterpreterResult(parsedLines);

      if (runtime.hasErrors) {
        runtime.Errors.forEach(err => {
          setErrors([...errors, err.message]);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onEditorMount: OnMount = editor => {
    __("onEditorMount");

    editorRef.current = editor;
    const content = editor.getValue();

    if (content !== "") {
      setContentParam(content);
      parseEditorContent();
    }
  };

  const onEditorChange: OnChange = debounce((input?: string) => {
    __("onEditorChange");

    if (input !== "") {
      setContentParam(input);
    }

    parseEditorContent();
  }, EDITOR_ON_CHANGE_TIMEOUT);

  const handleResetButton = () => {
    runtime.reset();
    setEditorContents("");
    setErrors([]);
  };

  const handleRunButton = () => {
    parseEditorContent();
  };

  // "onPageLoad"
  useEffect(() => {
    __("useEffect[]", "router.isReady", router.isReady);

    if (router.isReady) {
      __("useEffect[]", "router.isReady", router.isReady);

      setInitialContent(getContentParam());
      setActiveTab(getTabParam("home"));
      // parseEditorContent();
    }
  }, []);

  useEffect(() => {
    __("useEffect[activeTab]");
    setTabParam(activeTab);
  }, [activeTab]);

  useEffect(() => {
    __("useEffect[router.isReady]", "router.isReady", router.isReady);

    if (router.isReady) {
      __("useEffect[router.isReady]", "router.isReady", router.isReady);

      setInitialContent(getContentParam() ?? useExampleCode());
      setActiveTab(getTabParam("home"));
      // parseEditorContent();
    }
  }, [router.isReady]);

  useEffect(() => {
    __("useEffect[editorRef.current, router.isReady]", router.isReady);

    if (router.isReady) {
      __("useEffect[editorRef.current, router.isReady]");

      const content = getContentParam();

      if (content !== "") {
        setEditorContents(content);
        parseEditorContent();
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
                  onClick={() => setActiveTab(tabName)}
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
