import { setupClerkTestingToken } from '@clerk/testing/cypress'

describe('Buy spot in a bunker', () => {
  // beforeEach(() => {
  //   // setupClerkTestingToken()

  //   // cy.visit('http://localhost:3000/sign-in')

  //   // cy.get('.cl-signIn-root').should('be.visible')

  //   // // mocking our create payment intent endpoint
  //   // cy.intercept('POST', '/api/create_payment_intent', {
  //   //   fixture: 'success-payment-intent.json',
  //   // }).as('createPaymentIntent')

  //   // // mocking stripe confirm payment intent endpoint
  //   // cy.intercept('POST', 'https://api.stripe.com/v1/payment_intents/*/confirm', {
  //   //   body: {
  //   //     // stripe client requires `error` to be present for both success and failed response
  //   //     error: false,
  //   //   },
  //   // }).as('confirmPayment')

  //   // cy.visit('http://localhost:3000/payment-preview?id=6d9caa03-1048-4fec-b906-7f8bef4d3c23')
  //   // cy.contains('You need to log in to buy spot in this bunker.').should('exist')

  //   cy.visit('http://localhost:3000/sign-in')

  //   cy.get('.cl-signIn-root').should('exist')
  //   cy.get('input[name=identifier]').type(Cypress.env('test_user'))

  //   cy.get('.cl-formButtonPrimary').contains('button', 'Continue').click()
  //   cy.get('input[name=password]').type(Cypress.env('test_password'))

  //   cy.get('.cl-formButtonPrimary').contains('button', 'Continue').click()

  //   cy.url().should('include', '/protected')
  //   cy.contains('h1', 'This is a PROTECTED page')

  //   cy.visit('/')
  //   cy.contains('signed-in')

  //   cy.wait(5500)

  //   // setupClerkTestingToken()
  //   // cy.clerkLoaded()
  //   // cy.clerkSignIn({ strategy: 'email_code', identifier: 'wozna.magda+clerk_test@gmail.com' })
  // })

  it('Successfully buy spot in a bunker', () => {
    setupClerkTestingToken()
    cy.clerkSignIn({ strategy: 'email_code', identifier: 'wozna.magda+clerk_test@gmail.com' })

    cy.visit('http://localhost:3000')
  })

  // it('should display form elements', () => {
  //   //   cy.getByTestId('payment-form')
  //   // .should( (items) => {

  //   // cy.contains('You need to log in to buy spot in this bunker.').should('exist')
  //   cy.contains('Sign in').should('exist')

  //   //   // but no worries, we will retry until these pass or until timeout
  //   // cy.getByTestId('payment-form').should('be.visible')

  //   // cy.getStripeElement('number').find('.StripeElement').should('exist')
  //   // cy.getByTestId('card-expiry').find('.StripeElement').should('exist')
  //   // cy.getByTestId('card-cvc').find('.StripeElement').should('exist')
  // })
})

export {}
