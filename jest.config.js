module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"], // Matches your test files
  moduleFileExtensions: ["ts", "js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional, for global setups
};
