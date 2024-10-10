it('displays correct heading when navigating to shows route', () => {
    // visit the home page first
    // '/"  is the root of the site"
    cy.visit('/')
    cy.findByRole('link', { name: /shows/i }).click()
    cy.findByRole('heading', { name: /upcoming shows/i }).should('exist')
})