import { TextDecoder, TextEncoder } from "util";

import { server } from "@/__tests__/__mocks__/msw/server";

import { resetDb } from "./__tests__/__mocks__/db/utils/reset-db";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
// Establish API mocking before all tests.
beforeAll(() => server.listen());

beforeEach(async () => {
  await resetDb();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
