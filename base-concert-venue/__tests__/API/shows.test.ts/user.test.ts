import { testApiHandler } from "next-test-api-route-handler";

import userReservationsHandler from "../../../pages/api/users/[userId]/reservations";
import userAuthHandler from "../../../pages/api/users/index";

// what does this mock do ?
// this mock is used to mock the validateToken function from the utils.ts file
// it is used to mock the function that checks if the user is authenticated
jest.mock("@/lib/auth/utils");

test("POST from api/users receives token with correct credentials", async () => {
  await testApiHandler({
    handler: userAuthHandler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.test",
          password: "test",
        }),
      });
      expect(res.status).toBe(200);
      const json = await res.json();

      // the token will change everytime, but we can check that it is defined
      expect(json).toHaveProperty("user");
      expect(json.user.id).toBe(1);
      expect(json.user.email).toBe("test@test.test");
      expect(json.user).toHaveProperty("token");
    },
  });
});

test("GET /api/user[userId]/reservations returns the correct number of reservations", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      params.userId = "1";
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.userReservations).toHaveLength(2);
      expect(json.userReservations).not.toHaveLength(3);
    },
  });
});

test("GET /api/user[userId]/reservations returns no reservations for non-existant id", async () => {
  await testApiHandler({
    handler: userReservationsHandler,
    paramsPatcher: (params) => {
      params.userId = "511121";
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.userReservations).toHaveLength(0);
      expect(json.userReservations).not.toHaveLength(1);
    },
  });
});
