const config = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.test.json"
      }
    ]
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"]
};

module.exports = config;
