const { jestConfig } = require("../../tools");
const pkg = require("./package.json");

module.exports = {
  ...jestConfig(pkg),
  setupFilesAfterEnv: ["jest-extended/all"]
};
