import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  test: {
    setupFiles: [path.join(__dirname, "tests/_vitest/setup.ts")],
    coverage: {
      provider: "v8"
    },
    poolOptions: {
      forks: {
        // singleFork: true
      }
    }
  },
});
