/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  tsconfig: "./tsconfig.build.json",
  name: "Fanuc Macro B",
  entryPoints: ["./src/index.ts"],
  logLevel: "Error",
  customCss: "./typedoc.theme.css",
  excludeExternals: true,
  // "useTsLinkResolution": true,
  externalPattern: ["**/xstate/**/*.ts"],
  compilerOptions: {
    skipLibCheck: true,
    noUnusedLocals: false,
    types: ["node"]
  },
  themeColor: "#FFFF00",
  plugin: [
    "typedoc-material-theme",
    "typedoc-plugin-markdown"
    // "typedoc-plugin-missing-exports"
  ],
  outputs: [
    {
      name: "html",
      path: "./docs",
      options: {
        navigation: {
          includeCategories: true,
          includeGroups: true,
          excludeReferences: false,
          includeFolders: true
        }
      }
    },
    {
      name: "json",
      path: "./docs.json"
    },
    {
      // requires typedoc-plugin-markdown
      name: "markdown",
      path: "./docs_markdown"
    }
  ]
};

export default config;
