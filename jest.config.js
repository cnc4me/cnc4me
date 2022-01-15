module.exports = {
  rootDir: ".",
  preset: "ts-jest",
  // setupFiles: ["<rootDir>/testing/test-helpers.ts"],
  globals: {
    parseSource: true // test-helpers.ts
  },
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  modulePathIgnorePatterns: ["/build"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  },
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "demo",
    "build",
    "node_modules",
    "helpers.ts"
  ],
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
    // "^.+\\.jsx?$": "babel-jest"
  },
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"]
};
