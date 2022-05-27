const { jestConfig } = require("../../tools/jestConfig");
const pkg = require("./package.json");

/** @type import("ts-jest/dist/types").ProjectConfigTsJest */
module.exports = {
  ...jestConfig(pkg),
  setupFilesAfterEnv: [require.resolve("./tests/setup.ts")]
};
