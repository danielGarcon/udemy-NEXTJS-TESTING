// import "@testing-library/cypress/add-commands";
// cypress/support/index.js
// In the test, you strip away all the scripts to simulate the static HTML content that would be served from the ISR cache.
//  This helps ensure that the correct data is present in the static content before any client-side JavaScript is executed.
//  its('body'): Extracts the body of the response.
// .then((html) => { ... }): Processes the HTML content.
// html.replace(/<script.*?>.*<\/script>/gm, ""): Removes any script tags from the HTML to simulate static content.
// static is what would be originally available before any scripts are executed which would load the data
// cy.state('document').write(staticHTML): Writes the static HTML content to the document.

it("skips client-side bundle", () => {
  cy.request("/shows")
    .its("body")
    .then((html) => {
      // remove scripts so that they don't start automatically
      const staticHTML = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHTML);
    });

  //   cy.contains("h2", /the wandering bunnies/i, { timeout: 20000 }).should(
  //     "exist"
  //   );
  //   cy.contains("h2", /shamrock pete/i, { timeout: 20000 }).should("exist");
  //   cy.contains("h2", /the joyous run riot/i, { timeout: 20000 }).should("exist");
});
