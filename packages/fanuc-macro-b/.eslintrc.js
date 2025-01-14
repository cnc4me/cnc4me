/* eslint-env node */
// const path = require("node:path");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    emcaVersion: "2024",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json", "../*/tsconfig.json"],
  },
  env: {
    es6: true,
    node: true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".mjs", ".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".mjs", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        project: ["./tsconfig.json", "../*/tsconfig.json"],
      },
    },
  },
  plugins: [
    "import",
    "prettier",
    "@typescript-eslint",
    "simple-import-sort",
    "eslint-plugin-tsdoc",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:prettier/recommended", // KEEP THIS LAST
  ],
  rules: {
    "prettier/prettier": "error",
    "tsdoc/syntax": "warn",

    //
    // typescript
    //
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/no-empty-function": [
      "error",
      { allow: ["arrowFunctions"] },
    ],
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true,
        allowBoolean: true,
        allowAny: true,
        allowNullish: true,
        allowRegExp: true,
      },
    ],

    //
    // simple-import-sort
    //
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

    //
    // eslint-plugin-import
    //
    "import/namespace": "off", // SUPER DUPER SLOW, why?
    "import/default": "off", // ALSO SLOW, why?
    "import/no-named-export": "off",
    "import/no-default-export": "off",
    "import/prefer-default-export": "off",
    "import/first": "error",
    "import/no-amd": "error",
    "import/no-duplicates": "error",
    "import/no-mutable-exports": "error",
    "import/no-named-default": "error",
    "import/no-self-import": "error",
    "import/no-absolute-path": "error",
    "import/newline-after-import": "error",
  },
};
