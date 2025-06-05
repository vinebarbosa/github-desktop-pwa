import { ROUTES } from "../../src/modules/shared/routes"

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.session([], () => {
    cy.visit('/')

    cy.get('input[name=password]').type(Cypress.env('TEST_PASSWORD'))
    cy.get('button[type=submit]').click()

    cy.url().should('include', ROUTES.repositories)
  })
})
