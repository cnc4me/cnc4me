/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    emcaVersion: "2022",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.eslint.json", "./packages/*/tsconfig.eslint.json"],
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
        alwaysTryTypes: true,
        project: ["./packages/*/tsconfig.json"],
      },
    },
  },
  plugins: ["import", "prettier", "@typescript-eslint", "simple-import-sort"],
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
    "import/no-unresolved": ["error", { caseSensitive: false }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        peerDependencies: true,
        optionalDependencies: false,
      },
    ],
  },
  overrides: [
    // // all test files
    // {
    //   plugins: ["jest"],
    //   extends: ["plugin:jest/all"],
    //   files: [
    //     "packages/*/jest.config.js",
    //     "packages/*/tests/**/*.spec.ts",
    //     "packages/*/tests/**/*.test.ts",
    //   ],
    //   rules: {
    //     "@typescript-eslint/no-unsafe-call": "off",
    //     "@typescript-eslint/no-unsafe-return": "off",
    //     "@typescript-eslint/no-unsafe-assignment": "off",
    //     "@typescript-eslint/no-unsafe-member-access": "off",
    //   },
    // },
    // tools and tests
    {
      files: ["**/tools/**/*.ts", "**/tests/**/*.ts"],
      rules: {
        // allow console logs in tools and tests
        "no-console": "off",
      },
    },
    {
      files: ["vite.config.ts", "rollup.config.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["packages/website/src/**/*.{ts,tsx}"],
      rules: {
        "import/no-default-export": "off",
        "no-console": "off",
      },
    },
  ],
};
