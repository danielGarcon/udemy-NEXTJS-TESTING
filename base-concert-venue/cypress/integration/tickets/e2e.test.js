it("can sign in and purchase ticket and check it updates the db", () => {
  cy.task("db:reset").visit("/"); // Timeout set to 30 seconds
  // make sure that there's no sign-in page

  cy.findByRole("button", { name: /shows/i, timeout: 30000 }).click();

  cy.wait(4000);

  cy.signIn(Cypress.env("TEST_USER_EMAIL"), "test");

  cy.findByRole("button", { name: /shows/i, timeout: 30000 }).click();
  cy.wait(4000);

  cy.findAllByRole("button", { name: /tickets/i, timeout: 30000 })
    .last()
    .click();

  cy.findByRole("heading", { name: /the joyous nun riot/i }).should("exist");
  cy.findByRole("button", { name: /purchase/i }).should("exist");

  cy.findByRole("spinbutton").clear().type("5");

  cy.findByRole("button", { name: /purchase/i }).click();

  cy.wait(20000);

  cy.findByRole("button", { name: /5 seats confirmed/i }).should("exist");

  cy.findByRole("button", { name: /see all purchases/i }).click();

  cy.findByText(/the joyous nun riot/i).should("exist");

  // naviagte back to the shows page to check that the tucket count has updated

  cy.findByRole("button", { name: /shows/i, timeout: 30000 }).click();
  cy.wait(4000);

  cy.findAllByRole("button", { name: /tickets/i, timeout: 30000 })
    .last()
    .click();

  cy.findByRole("button", { name: /5 seats left/i }).should("exist");
});
