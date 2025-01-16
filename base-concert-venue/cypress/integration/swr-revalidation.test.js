// import { should } from "chai";

// import { resetDb } from "../../__tests__/__mocks__/db/utils/reset-db";
// import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateNewReservation } from "../../__tests__/__mocks__/fakeData/newReservation";
import { generateRandomId } from "../../lib/features/reservations/utils";

const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30 * ONE_SECOND;
const FIFTEEN_SECONDS = 15 * ONE_SECOND;
it("should refresh the page after 30 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/shows");

  // there should only be one sold out show at this point
  // I sometimes need to increase the wait because
  // my pc overheats and slows down
  cy.findAllByText(/Sold Out/i).should("have.length", 1, { timeout: 20000 });

  // add a new reservation and buy up all the tickets for the first show

  // the first show has an id of 0 and 10 tickets available
  const newReservation = generateNewReservation({
    reservationId: generateRandomId(),
    showId: 0,
    seatCount: 10,
  });
  cy.task("addReservation", newReservation);

  // advance the clock by one second, th data should not have changed
  // the page is supposed to update every 30 seconds

  cy.tick(ONE_SECOND);
  cy.findAllByText(/Sold Out/i).should("have.length", 1, { timeout: 20000 });

  // advance the clock by 30 seconds, the page should have updated
  cy.tick(THIRTY_SECONDS);
  cy.findAllByText(/Sold Out/i).should("have.length", 2, { timeout: 20000 });
});

it("checks that the page updates after an interval", () => {
  cy.clock();
  cy.task("db:reset").visit("/reservations/0");

  cy.findByRole("main").within(() =>
    cy.findByRole("button", { name: /sign in/i }).click()
  );

  // // check that 10 tickets are still available
  // add a timeout of 20000 because my pc is slow

  cy.findByText(/10 seats left/i).should("exist", { timeout: 20000 });

  cy.findByText(/10 seats left/i).should("exist");

  const newReservation = {
    reservationId: 12345,
    showId: 0,
    seatCount: 2,
  };
  cy.task("addReservation", newReservation);
  cy.tick(ONE_SECOND)
  cy.findByText(/10 seats left/i).should("exist");

  cy.tick(FIFTEEN_SECONDS);

  // check that the page has updated
  // and that no tickets are available
  cy.findByText(/8 seats left/i).should("exist");
});
