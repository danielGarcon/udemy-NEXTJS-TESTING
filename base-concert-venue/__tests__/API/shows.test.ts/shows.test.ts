import { testApiHandler } from "next-test-api-route-handler";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";

import showIdHandler from "../../../pages/api/shows/[showId]";
import showsHandler from "../../../pages/api/shows/index";

test("api/shows returns shows from database", async () => {
  await testApiHandler({
    handler: showsHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      const { fakeShows } = await readFakeData();
      expect(json).toEqual({ shows: fakeShows });
    },
  });
});

test("Get /api/shows/[showId] returns the data for the correct show id", async () => {
  // SImply explained, what does paramsPatcher do?
  // It is a function that takes the params object and modifies it.
  // In this case, it sets the showId property to "0".
  // This is useful for testing the API handler with a specific showId.
  // In this case, it sets the showId property to "0"
  // It alllows us to modify the parameters in the request query that we see in the browser
  await testApiHandler({
    handler: showIdHandler,

    paramsPatcher: (params) => {
      params.showId = "0";
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });
      expect(res.status).toBe(200);
      const { fakeShows } = await readFakeData();

      const json = await res.json();
      expect(json).toEqual({ show: fakeShows[0] });
    },
  });
});
