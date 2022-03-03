const path = require("path");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    emcaVersion: "2020",
    sourceType: "module",
    tsconfigRootDir: path.resolve(__dirname),
    project: ["./tsconfig.eslint.json", "./packages/*/tsconfig.json"]
  },
  env: {
    es6: true,
    node: true
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      typescript: {
        alwaysTryTypes: true,
        project: ["./packages/*/tsconfig.json"]
      }
    }
  },
  plugins: [
    "jest",
    "import",
    "prettier",
    "@typescript-eslint",
    "simple-import-sort"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/typescript",
    "prettier",
    "plugin:prettier/recommended" // KEEP THIS LAST
  ],
  rules: {
    "prettier/prettier": "error",

    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": [
      "error",
      { allow: ["arrowFunctions"] }
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true,
        allowBoolean: true,
        allowAny: true,
        allowNullish: true,
        allowRegExp: true
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }
    ],

    //
    // eslint-base
    //

    curly: ["error", "all"],
    "no-mixed-operators": "error",
    "no-console": "error",
    "no-process-exit": "error",

    //
    // simple-import-sort
    //

    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    //
    // eslint-plugin-import
    //

    "import/first": "error",
    "import/prefer-default-export": "warn",
    "import/no-default-export": "off",
    "import/no-named-export": "off",
    "import/no-amd": "error",
    "import/no-duplicates": "error",
    "import/no-absolute-path": "error",
    "import/newline-after-import": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        peerDependencies: true,
        optionalDependencies: false
      }
    ],
    "import/no-unresolved": ["error", { caseSensitive: false }],
    "import/no-mutable-exports": "error",
    "import/no-named-default": "error",
    "import/no-self-import": "error",
  },
  overrides: [
    // all test files
    {
      plugins: [
        "jest"
      ],
      extends: [
        "plugin:jest/all",
      ],
      files: [
        "packages/*/*.config.js",
        "packages/*/tests/**/*.spec.ts",
        "packages/*/tests/**/*.test.ts",
        "packages/*/tests/**/spec.ts",
        "packages/*/tests/**/test.ts"
      ],
      rules: {
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "jest/prefer-expect-assertions": "off",
        "jest/prefer-to-be": "warn",
        "jest/no-disabled-tests": "warn",
        "jest/prefer-to-contain": "warn",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "jest/prefer-spy-on": "error",
        "jest/no-jest-import": "error",
        "jest/no-focused-tests": "error",
        "jest/no-alias-methods": "error",
        "jest/no-test-prefixes": "error",
        "jest/no-done-callback": "error",
        "jest/no-identical-title": "error",
        "jest/no-jasmine-globals": "error",
        "jest/no-test-return-statement": "error",
        "jest/no-deprecated-functions": "error"
      }
    },
    // tools and tests
    {
      files: ["**/tools/**/*.ts", "**/tests/**/*.ts"],
      rules: {
        // allow console logs in tools and tests
        "no-console": "off"
      }
    },
    {
      files: ["rollup.config.ts"],
      rules: {
        "import/no-default-export": "off"
      }
    },
    {
      files: ["packages/website/src/**/*.{ts,tsx}"],
      rules: {
        "import/no-default-export": "off",
        "no-console": "off"
      }
    }
  ]
};
