import "@testing-library/jest-dom/extend-expect";

export default {
  preset: "ts-jest", // Use the ts-jest preset for TypeScript
  testEnvironment: "jsdom", // You can change this environment as needed
  types: ["jest", "node", "@testing-library/jest-dom/extend-expect"],
  roots: ["<rootDir>/src"], // Specify the root directory of your tests
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$", // File pattern for test files
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
