export default {
    testEnvironment: "node",
    transform: {
      "^.+\\.js$": "babel-jest",
    },
    testMatch: ["**/__tests__/**/*.test.js"],
    setupFilesAfterEnv: ["./jest.setup.js"],
  };
  