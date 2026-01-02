import { index, route } from "@react-router/dev/routes";
import type { RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/root.tsx"),
  route("/ide", "routes/ide.tsx"),
  route("/ide2", "routes/ide2.tsx"),
  route("/vscode", "routes/vscode.tsx"),
  route("/editor", "routes/editor.tsx"),
] satisfies RouteConfig;
