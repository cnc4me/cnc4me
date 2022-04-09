import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "../../dist/website"
  },
  plugins: [react(), tsconfigPaths()]
});
