import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineProject } from "vitest/config";

const setupFile = path.join(__dirname, "tests/_vitest/setup.ts");

export default defineProject({
  root: ".",
  test: {
    setupFiles: [setupFile],
    coverage: {
      provider: "v8",
    },
  },
  plugins: [tsconfigPaths()],
});
