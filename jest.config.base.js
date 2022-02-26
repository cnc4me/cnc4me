const path = require("path");

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    "^.+\\.tsx?$": "@swc/jest"
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json"
    }
  },
  moduleDirectories: ["node_modules"],
  modulePaths: [`<rootDir>/packages/`],
  moduleFileExtensions: ["ts", "js", "html"],
  moduleNameMapper: {
    "^@cnc4me/(.+)$": "<rootDir>/packages/$1"
  }
};
