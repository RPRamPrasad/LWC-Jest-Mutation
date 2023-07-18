const { jestConfig } = require("./jest.config.js");
module.exports = {
  testRunner: "jest",
  coverageAnalysis: "off",
  timeoutMS: 60000,
  tempDirName: "stryker-tmp",
  files: [
    "*",
    "force-app/main/default/lwc/*",
    "force-app/main/default/lwc/**/*",
    "force-app/test/jest-mocks/*",
    "force-app/test/jest-mocks/**/*"
  ],
  mutate: [
    "force-app/main/default/lwc/**/*.js",
    "!force-app/main/default/lwc/**/__tests__/*.*"
  ],
  reporters: ["html", "progress", "dots", "clear-text"],
  thresholds: { high: 90, low: 85, break: 90 },
  jest: {
    projectType: "custom",
    config: jestConfig,
    enableFindRelatedTests: true
  }
};
