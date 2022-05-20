import "../styles/index.css";

import { AppProps } from "next/app";
import React from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
