import "../styles/index.css";

import { MacroRuntime } from "@cnc4me/fanuc-macro-b";
import { AppProps } from "next/app";
import React from "react";

import { MacroRuntimeContext } from "../context/MacroRuntimeContext";

const runtime = new MacroRuntime();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MacroRuntimeContext.Provider value={runtime}>
      <Component {...pageProps} />
    </MacroRuntimeContext.Provider>
  );
}
