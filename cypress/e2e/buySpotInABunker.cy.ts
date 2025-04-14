describe('Buy spot in a bunker', () => {
  it('Successfully buy spot in a bunker', () => {
    cy.visit('http://localhost:3000')

    cy.clerkSignIn({ strategy: 'email_code', identifier: 'wozna.magda+clerk_test@gmail.com' })
    cy.contains('Browse Bunkers').click()
    cy.get('[class*="marker-view"]').first().click({ force: true })
    cy.contains('Buy spot in this bunker').click()
  })
})

export {}
