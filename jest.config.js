module.exports = {
  rootDir: ".",
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  modulePathIgnorePatterns: ["/build"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  },
  testPathIgnorePatterns: ["demo", "build", "node_modules"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
    // "^.+\\.jsx?$": "babel-jest"
  },
};
