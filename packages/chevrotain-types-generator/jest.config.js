const { jestConfig } = require("../../tools/testing-utils");
const pkg = require("./package.json");

module.exports = {
  ...jestConfig(pkg),
  setupFilesAfterEnv: ["jest-extended/all"]
};
