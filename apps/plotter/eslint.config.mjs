import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import"; // 'import' is ambiguous & prettier has trouble
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["**/*.d.*", "**/*.map.*", "**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
          modules: true,
        },
      },
    },

    plugins: {
      ts,
      prettier,
      import: importPlugin,
      "@typescript-eslint": ts,
      "simple-import-sort": pluginSimpleImportSort,
    },

    rules: {
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
    },
  },
];
