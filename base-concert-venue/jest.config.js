// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // to prevent non-test files from being interpreted as test files
  testRegex: "/__tests__/.*/.*\\.test\\.[jt]sx?$",
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jsdom",
  watchPathIgnorePatterns: ["<rootDir>/__tests__/__mocks__/db/.*\\.json"],
  modulePathIgnorePatterns: ["<rootDir>/cypress/"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
