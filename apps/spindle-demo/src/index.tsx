import { SpindleFSM } from "@cnc4me/fanuc-macro-b";
import { createRoot } from "react-dom/client";

import { App } from "./App";

const spindle = new SpindleFSM({
  rpm: { max: 8000 }
});

const root = createRoot(document.getElementById("app")!);

root.render(<App spindle={spindle} />);
