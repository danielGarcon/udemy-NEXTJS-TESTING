import { rest } from "msw";

import { readFakeData } from "../fakeData";
import { fakeUserReservations } from "../fakeData/userReservations";

export const handlers = [
  rest.get("http://localhost:3000/api/shows/:showId", async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    const { showId } = req.params;
    // get the userId

    // show 1 has no tickets left

    return res(ctx.json({ show: fakeShows[Number(showId)] }));
  }),

  // add a if then statement to check if the user has a reservation

  // if the user id is 0 then the user has no reservation
  rest.get(
    "http://localhost:3000/api/users/:userId/reservations",
    async (req, res, ctx) => {
      console.log('here')
      const { userId } = req.params;
      console.log('userId: \t', userId);
      const userReservations = Number(userId) === 1 ? fakeUserReservations : [];
      return res(ctx.json({ userReservations }));
    }
  ),
];
