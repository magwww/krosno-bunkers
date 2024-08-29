describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays Welcome heading and button for selecting bunkers', () => {
    cy.get('[data-testid=home-header]').should('have.text', 'Welcome to Krosno Bunkers!')
    cy.get('[data-testid=home-button]').should('have.text', 'Select your bunker')
  })
})

describe('Bunkers page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.contains('Select your bunker').click()
  })

  it('displays google map with 10 markers', () => {
    cy.get('[data-testid=google-map]').should('exist')
    cy.get('[class*="marker-view"]').should('have.length', 10)
  })

  it('displays info window after marker click', () => {
    cy.get('[class*="marker-view"]').first().click({ force: true })
    cy.get('[data-testid=google-map-info-window').should('exist')
    cy.contains('Buy spot in this bunker').should('exist')
  })
})

describe('Bunker preview page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.contains('Select your bunker').click()
    cy.get('[class*="marker-view"]').first().click({ force: true })
    cy.contains('Buy spot in this bunker').click()
  })

  it('redirects to sign in page', () => {
    cy.contains('You need to log in to buy spot in this bunker').should('exist')
  })
})
