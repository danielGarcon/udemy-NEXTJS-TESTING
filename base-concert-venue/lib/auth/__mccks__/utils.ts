// NOTE: This file is a mock of the original file.
module.exports = {
  esModule: true,
  // the line below is because the original method "validateToken" is async and we need to return a promise that resolves to true
  validateToken: jest.fn().mockResolvedValue(true),
};

// to satisfy jest and typescript
export {};

// mock module in test file using this code
// jest.mock("@/lib/auth/utils")