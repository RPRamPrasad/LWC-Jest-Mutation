// const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

// module.exports = {
//     ...jestConfig,
//     modulePathIgnorePatterns: ['<rootDir>/.localdevserver'],
//     moduleNameMapper: {

//         '^lightning/platformShowToastEvent$':
//         '<rootDir>/force-app/test/jest-mocks/lightning/platformShowToastEvent'

//     }
// };
const { jestConfig } = require("@salesforce/sfdx-lwc-jest/config");
jestConfig.testPathIgnorePatterns = [
  ...jestConfig.testPathIgnorePatterns,
  "<rootDir>/.stryker-tmp/"
];
module.exports = {
  ...jestConfig,
  collectCoverageFrom: [
    "force-app/main/default/lwc/**/*.js",
    "!**/node_modules/**"
  ],
  moduleNameMapper: {
    "^@salesforce/apex$": "<rootDir>/force-app/test/jest-mocks/apex",
    "^lightning/navigation$":
      "<rootDir>/force-app/test/jest-mocks/lightning/navigation",
    "^lightning/platformShowToastEvent$":
      "<rootDir>/force-app/test/jest-mocks/lightning/platformShowToastEvent",
    "^lightning/uiRecordApi$":
      "<rootDir>/force-app/test/jest-mocks/lightning/uiRecordApi",
    "^c/(.*)": "<rootDir>/force-app/main/default/lwc/$1/$1.js"
  }
};
