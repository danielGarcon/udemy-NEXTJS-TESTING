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

Cypress.Commands.add("signIn", (email, password) => {
  // for many auth systems this would post to an API and not a UI
  cy.visit("/auth/signin");

  // fill out the sign in form
  cy.findByLabelText(/email address/i)
    .clear()
    .type(email);
  cy.findByLabelText(/password/i)
    .clear()
    .type(password);

  cy.findByRole("main", { timeout: 30000 }).within(() => {
    cy.findByRole("button", { name: /sign in/i, timeout: 30000 }).click();
  });

  // check that the welcome message shows
  /// cy.findByRole("heading", { name: /welcome/i }).should("exist");
});
