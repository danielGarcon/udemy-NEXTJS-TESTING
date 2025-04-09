it("purchase more tickets", () => {
  cy.task("db:reset").signIn(Cypress.env("TEST_USER_EMAIL"), "test");

  // access tckets oage for the firsts show
  cy.visit("/user"); // Timeout set to 30 seconds
  // make sure that there's no sign-in page
  cy.findByRole("main", { timeout: 30000 }).within(() => {
    cy.findByRole("button", { name: /sign in/i, timeout: 30000 }).click();
  });

  // make sure that te purchase ticket button shows
  cy.findByRole("button", { name: /purchase more tickets/i }).should("exist");

  // click on the purchase button
  cy.findByRole("button", { name: /upcoming shows/i }).click();
});
