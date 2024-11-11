it("skips client-side bundle", () => {
  cy.request("/shows")
    .its("body")
    .then((html) => {
      // remove scripts so that they don't start automatically
      const staticHTML = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHTML);
    });

  // get length
  cy.findAllByText(/2022 Apr 1[567]/i).should("have.length", 3);

  // for some reason the line below isn't working, so in the future, use the line above
  // cy.findAllByText(/2022 Apr 1[456]/i).toHaveLength(3);
});
