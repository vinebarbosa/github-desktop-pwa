import { ROUTES } from "../../src/modules/shared/routes"

describe('Criação de repositório', () => {
  beforeEach(() => {
    cy.login()
  })

  it.skip('Deve criar um repositório com sucesso', () => {
    cy.visit(ROUTES.repositories)

    cy.contains('button', 'Criar repositório').click()

    cy.get('[data-testid="create-repository-form"]').should('be.visible')
    cy.get('input[name="name"]').type('meu-novo-repo')

    cy.get('[data-testid="create-repository-form"] > .inline-flex').click()

    cy.contains(/Teu repositório foi criado!/i).should('be.visible')
  })

  it('Deve exibir erro se falhar na criação', () => {
    cy.visit(ROUTES.repositories)

    cy.contains('button', 'Criar repositório').click()

    cy.get('[data-testid="create-repository-form"]').should('be.visible')
    cy.get('input[name="name"]').type('repo-invalido')

    cy.get('[data-testid="create-repository-form"] > .inline-flex').click()

    cy.get('[data-content=""] > div').should("contain.text", "Nome inválido")
  })
})
