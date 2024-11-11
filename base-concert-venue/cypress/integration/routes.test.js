import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../lib/features/reservations/utils";

it("displays correct heading when navigating to shows route", () => {
  // visit the home page first
  // '/"  is the root of the site"
  cy.visit("/shows");
  cy.findByRole("button", { name: /shows/i }).click();
  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});

it("displays bands heading correctly", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /bands/i }).should("exist");
  // click on the bands heading
  cy.findByRole("button", { name: /bands/i }).click();
  // check if the bands page is displayed
  cy.findByRole("heading", { name: /Our Illustrious Performers/i }).should(
    "exist"
  );
});

it("diaplays correct band name for route that exists at build time", () => {
  cy.task("db:reset").visit("/bands/1");
  cy.findByRole("heading", { name: /shamrock pete/i }).should("exist");
});

it("doesnt display band route that doesnt exist at build time", () => {
  cy.task("db:reset").visit("/bands/999");
  cy.findByRole("heading", {
    name: /Could not retrieve band data/i,
  }).should("exist");
});

it("displays correct band name for route doesnt exists at build time", () => {
  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);
  // reset the db first
  // cy.task("db:reset");
  cy.task("addBand", newBand).visit(`/bands/${bandId}`);
  cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");
});

// ________________________________________________________
// It might seem logical to reset the database at the end of the test instead of the beginning,
// in order to leave the database in a clean state for any test that may follow. Unfortunately,
// this is a recipe for trouble. Say your test fails and exits before the database reset can run.
// Then the next test is stuck with an unpredictable database and the assertions can't be trusted.
// For this reason, it is usually the best practice to reset at the beginning of the test rather than the end
// ________________________________________________________

// this tests just checks that the db-reset task is working
// which calls thw db reset method to reset the db at the beginning of each test
// it("resets the DB", () => {
//   cy.task("db:reset");
// });
