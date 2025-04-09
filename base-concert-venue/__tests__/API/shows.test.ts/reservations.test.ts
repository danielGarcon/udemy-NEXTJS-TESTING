import { testApiHandler } from "next-test-api-route-handler";

import reservationHandler from "@/pages/api/reservations/[reservationId]";
import userReservationHandler from "@/pages/api/users/[userId]/reservations";

import userAuthHandler from "../../../pages/api/users/reservations";


jest.mock("@/lib/auth/utils");

test("POST /api/reservations/[reservationId] creates a reservation", async () => {
  await testApiHandler({
    handler: reservationHandler,
    paramsPatcher: (params) => {
      params.reservationId = 12345;
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seatCount: 5,
          userId: 1,
          showId: 0,
        }),
      });
      const json = await res.json();
      console.log("json", json);

      expect(res.status).toBe(201);
    },
  });

  // call the test handler with the userId
  await testApiHandler({
    handler: userReservationHandler,
    paramsPatcher: (params) => {
      params.userId = "1";
    },
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.userReservations).toHaveLength(3);
      expect(json.userReservations).not.toHaveLength(2);
    },
  });
});
