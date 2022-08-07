/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: "test.ts$",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  coverageDirectory: "./coverage",
  testEnvironment: "node",
  moduleDirectories: ["node_modules"],
};
