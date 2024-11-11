import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateRandomId } from "../../lib/features/reservations/utils";

it("should load refrehsed page from cache after new band is added", () => {
  // check that new band is not on the page
  cy.task("db:reset").visit("/bands");
  //   cy.findByRole("heading", { name: /avalanche of cheese/i }).should(
  //     "not.exist"
  //   );
  cy.findByText(/avalanche of cheese/i).should("not.exist");

  const bandId = generateRandomId();
  const band = generateNewBand(bandId);
  const secret = Cypress.env("REVALIDATION_SECRET").trim()
  cy.log("REVALIDATION_SECRET:", secret);
  console.log("secret", secret);
  // add the new band via post request and the post request should also revalidate the cache
  cy.request({
    method: "POST",
    url: `/api/bands?secret=${secret}`,
    body: { newBand: band },
    failOnStatusCode: false, // Allow the test to continue even if the status code is not 2xx or 3xx
  }).then((response) => {
    // expect(response.status).to.equal(200);
    console.log("body", response.body);
    expect(response.body.revalidated).to.equal(true);
  });
  //   cy.request("POST", `/api/bands?secret=${secret}`, { newBand: band }).then(
  //     (response) => {
  //       expect(response.body.revalidated).to.equal(true);
  //     }
  //   );

  // then reload the page and the band should appear
  cy.reload();
  // cy.findByRole("heading", { name: /avalanche of cheese/i }).should("exist");
  cy.findAllByText(/avalanche of cheese/i).should("have.length.greaterThan", 0);

  // reset ISR cache to initial state
  cy.resetDbAndClearIsrCache();
});

// it("can revalidate the cache", () => {
//   cy.task("db:reset").visit("/bands");
//   cy.findByText(/avalanche of cheese/i).should("not.exist");
//   const newBandId = generateRandomId();
//   const newBand = generateNewBand(newBandId);
//   const secret = Cypress.env("REVALIDATION_SECRET");
//   cy.log("REVALIDATION_SECRET:", secret);
//   //   cy.request("POST", `/api/bands?secret=${secret}`, { newShow: newBand }).then(
//   //     (response) => {
//   //       expect(response.body.revalidated).to.equal(true);
//   //     }
//   //   );

//   cy.request({
//     method: "POST",
//     url: `/api/bands?secret=${secret}`,
//     body: { newShow: newBand },
//     failOnStatusCode: false,
//   }).then((response) => {
//     expect(response.body.revalidated).to.equal(true);
//   });
//   cy.reload();
//   cy.findAllByText(/avalanche of cheese/i).should("have.length.greaterThan", 0);
//   cy.resetDbAndClearIsrCache();
// });
