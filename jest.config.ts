// jest.config.ts

export default {
  // setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  // setupFilesAfterEnv: ["<rootDir/jest.ts"],
  // setupFiles: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  // rootDir: 'src',
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
  },
};
