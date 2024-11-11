// this adds the find by commands that we will use in our tests
import "@testing-library/cypress";
// cypress/support/index.js
import "@testing-library/cypress/add-commands";

// it("displays correct heading ", () => {
//   // visit the home page first
//   // '/"  is the root of the site"
//   cy.visit("/");
//   cy.findByRole("heading", { name: /shows/i }).should("exist");
//   // cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
//   cy.findByRole("button", { name: /shows/i }).should("exist");
// });

Cypress.Commands.add("resetDbAndClearIsrCache", () => {
  cy.task("db:reset");
  const secret = Cypress.env("REVALIDATION_SECRET");
  // cy.request({
  //   method: "GET",
  //   url: `/api/revalidate?secret=${secret}`,
  //   failOnStatusCode: false
  // });
  cy.request("GET", `/api/revalidate?secret=${secret}`);
});
