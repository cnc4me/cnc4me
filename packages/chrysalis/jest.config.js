const { jestConfig } = require("../../tools/jest.utils");
const pkg = require("./package.json");

module.exports = {
  ...jestConfig(pkg),
  setupFilesAfterEnv: ["jest-extended/all"]
};
