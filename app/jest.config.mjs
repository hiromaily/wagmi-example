import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  clearMocks: true,
  // Fix `SyntaxError: Cannot use import statement outside a module` and
  //  `SyntaxError: Unexpected token 'export'`
  transformIgnorePatterns: [
    "node_modules/(?!(@wagmi|wagmi|viem|abitype|@adraffy|@tanstack|@@coinbase|@walletconnect|detect-browser)/)",
  ],
  globals: {
    // For: error: TypeError: Expected input type is Uint8Array
    Uint8Array: Uint8Array,
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);