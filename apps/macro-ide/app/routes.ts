import { index, route } from "@react-router/dev/routes";
import type { RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/root.tsx"), //
  route("/editor", "routes/editor.tsx"), //
] satisfies RouteConfig;
