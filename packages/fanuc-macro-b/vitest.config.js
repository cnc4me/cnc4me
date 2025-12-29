import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const setupFile = path.join(__dirname, "tests/_vitest/setup.ts");

export default defineConfig({
  root: ".",
  test: {
    setupFiles: [setupFile],
    coverage: {
      provider: "v8",
    },
  },
  plugins: [tsconfigPaths()],
});
