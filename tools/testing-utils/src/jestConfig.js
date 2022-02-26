const path = require("path");
const baseConfig = require("../../../jest.config.base");

const rootDir = path.join(__dirname, "../../..");

/**
 * Helper function to create jest configs for packages
 **/
module.exports = pkg => {
  const packageName = pkg.name.replace("@cnc4me/", "");

  return {
    ...baseConfig,
    rootDir,
    name: packageName,
    displayName: packageName,
    roots: [`<rootDir>/packages/${packageName}`],
    collectCoverageFrom: ["src/**/*.{ts,tsx}"],
    coverageDirectory: `<rootDir>/coverage/packages/${packageName}`,
    testRegex: `(packages/${packageName}/.*/__tests__/.*|\\.(test|spec))\\.tsx?$`
  };
};
