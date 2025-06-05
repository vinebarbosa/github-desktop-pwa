import { ROUTES } from "../../src/modules/shared/routes"

describe('Autenticação', () => {
  it('Deve realizar o login com sucesso', () => {
    cy.visit('/')

    cy.get('input[name="password"]').type(Cypress.env('TEST_PASSWORD'))
    cy.contains('button', 'Entrar').click()

    cy.url().should('include', ROUTES.repositories)
    cy.contains('h1', 'Meus repositórios').should('be.visible')
  })

  it('Deve realizar o logout com sucesso', () => {
    cy.visit(ROUTES.profile)

    cy.contains('button', 'Sair').click()

    cy.url().should('include', "/")
  })
})
