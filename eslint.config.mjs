import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import"; // 'import' is ambiguous & prettier has trouble
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import nextJsPlugin from "@next/eslint-plugin-next";

/** @type { import("eslint").Linter.Config["languageOptions"] } */
const languageOptions = {
  parser: tsParser,
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json",
    ecmaFeatures: {
      modules: true,
    },
  },
};

/** @type { import("eslint").Linter.Config["plugins"] } */
const plugins = {
  ts,
  prettier,
  import: importPlugin,
  "@typescript-eslint": ts,
  "react-refresh": reactRefreshPlugin,
  "simple-import-sort": pluginSimpleImportSort,
};

/** @type { import("eslint").Linter.Config["rules"] } */
const rules = {
  ...ts.configs["eslint-recommended"].rules,
  ...ts.configs["recommended"].rules,
  "prettier/prettier": "error",
  "@typescript-eslint/no-unused-vars": "warn",
  "simple-import-sort/exports": "error",
  "simple-import-sort/imports": [
    "error",
    {
      // The default grouping, but with type imports last as a separate group.
      groups: [
        ["^\\u0000"],
        ["^node:"],
        ["^@?\\w"],
        ["^"],
        ["^\\."],
        ["^.+\\u0000$"],
      ],
    },
  ],
};

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    files: [
      "**/*.ts", //
      "**/*.d.ts", //
      "./apps/**/*.tsx",
      "**/vite.config.ts",
    ],
    languageOptions,
    plugins,
    rules,
  },
  {
    files: [
      "./apps/**/*.ts",
      "./apps/**/*.tsx",
      "./apps/macro-website/next.config.js",
    ],
    languageOptions: {
      ...languageOptions,
      ...{ parserOptions: { jsx: true } },
    },
    plugins: {
      ...plugins,
      next: nextJsPlugin,
      "react-refresh": reactRefreshPlugin,
    },
    rules: {
      ...rules,
      "react-refresh/only-export-components": "error",
    },
  },
];
