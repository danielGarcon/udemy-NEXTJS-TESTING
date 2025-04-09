// it("runs auth flow for successful login to protected reservations page", () => {
//   // visit reservations page for the firs show with an id of 1

//   //   // below is supposed to be 0, but the api/shows/0 call is returning a 500 error
//   cy.task("db:reset").visit("/reservations/0");
//   // check for the sign in form

//   cy.findByRole(
//     "heading",
//     { name: /sign in to your account/i },
//     { timeout: 60000 }
//   ).should("exist");

//   // check that there's np option to purchase tickets
//   cy.findByRole("button", { name: /purchase/i }).should("not.exist");
//   // enter valid sign in info

//   // clear the fields first

//   cy.findByLabelText(/email address/i)
//     .clear()
//     .type(Cypress.env("TEST_USER_EMAIL"));
//   cy.findByLabelText(/password/i)
//     .clear()
//     .type(Cypress.env("TEST_USER_PASSWORD"));

//   // submit the form
//   cy.findByRole("main").within(() => {
//     cy.findByRole("button", { name: /sign in/i }).click();
//   });

//   // check that the purchase button and band name shows up

//   cy.findByRole("button", { name: /purchase/i }, { timeout: 60000 }).should(
//     "exist"
//   );
//   //   cy.findByRole("heading", { name: /wandering bunnies/i }).should("exist");
//   cy.findByRole("heading", { name: /wandering bunnies/i }).should("exist");

//   // check that the email and sign out button show up

//   cy.findByRole("button", { name: /sign out/i }).should("exist");
//   cy.findByRole("button", { name: /sign in/i }).should("not.exist");

//   // cy.findByText(Cypress.env("TEST_USER_EMAIL")).should("exist");

//   // I don't see the above for some reason... I see "My profile" instead
//   cy.findByRole("button", { name: /my profile/i }).should("exist");
// });

// it("user", () => {
//   // attempt to navigate to the users page
//   cy.task("db:reset").visit("/user");

//   // check that the user is redirected to the login page
//   cy.findByRole("heading", { name: /sign in to your account/i }).should(
//     "exist"
//   );

//   cy.findByRole("heading", { name: /welcome/i }).should("not.exist");

//   // clear the fields of text and type in the email and password
//   cy.findByLabelText(/email address/i)
//     .clear()
//     .type("test@test");

//   // submit the form
//   cy.findByRole("main").within(() => {
//     cy.findByRole("button", { name: /sign in/i }).click();
//   });
//   // check that the error message shows up for the information being incorrect
//   // and add a wait

//   cy.findByRole("alert").should("exist");
//   // or
//   cy.findByText(/sign in failed/i).should("exist");

//   // clear the fields of text and type in the email and password
//   cy.findByLabelText(/email address/i)
//     .clear()
//     .type(Cypress.env("TEST_USER_EMAIL"));

//   cy.findByLabelText(/password/i)
//     .clear()
//     .type(Cypress.env("TEST_USER_PASSWORD"));

//   // submit the form
//   cy.findByRole("main").within(() => {
//     cy.findByRole("button", { name: /sign in/i }).click();
//   });

//   // check that we're on the right page
//   cy.findByRole("button", { name: /my profile/i }, { timeout: 60000 }).should(
//     "exist"
//   );

//   // sign in should not exist
//   cy.findByRole("button", { name: /sign in/i }).should("not.exist");
//   // sign out should exist
//   cy.findByRole("button", { name: /sign out/i }).should("exist");
// });

// it("redirects to sign in for protected pages", () => {
//   // Access our fixture file
//   cy.fixture("protected-pages.json").then((urls) => {
//     urls.forEach((url) => {
//       cy.task("db:reset").visit(url);
//       cy.findByRole("heading", { name: /sign in to your account/i }).should(
//         "exist"
//       );
//       cy.findByLabelText(/email address/i).should("exist");
//       cy.findByLabelText(/password/i).should("exist");
//     });
//   });
// });

// it("does not show the sign in page when already signed in", () => {
//   cy.task("db:reset").signIn(Cypress.env("TEST_USER_EMAIL"), "test");

//   // access tckets oage for the firsts show
//   cy.visit("/reservations/0"); // Timeout set to 30 seconds
//   // make sure that there's no sign-in page
//   cy.findByRole("main", { timeout: 30000 }).within(() => {
//     cy.findByRole("button", { name: /sign in/i, timeout: 30000 }).click();
//   });
//   cy.findByRole("heading", { name: /sign in to your account/i }).should(
//     "not.exist"
//   );

//   // make sure that te purchase ticket button shows
//   cy.findByRole("button", { name: /purchase/i }).should("exist");
// });


