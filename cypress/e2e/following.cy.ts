import { ROUTES } from "../../src/modules/shared/routes"

describe("Usuários que o usuários está seguindo", () => {
  beforeEach(() => {
    cy.login()
  })

  it("Deve listar os repositórios do usuário e navegar entre páginas", () => {
    cy.visit(ROUTES.followingUsers)

    cy.contains('h1', 'Seguindo').should('be.visible')
    cy.get('[data-testid="following-item"]').should('have.length', 5)
    cy.get('[data-testid="pagination-prev"]').should('have.attr', 'aria-disabled', 'true')

    // Vai para a página 2
    cy.get('[data-testid="pagination-next"]').click()

    cy.url().should('include', 'pagina=2')
    cy.get('[data-testid="following-item"]').should('have.length', 5)


    // Vai para a página 3
    cy.get('[data-testid="pagination-next"]').click()

    cy.url().should('include', 'pagina=3')
    cy.get('[data-testid="following-item"]').should('have.length', 5)
    cy.get('[data-testid="pagination-next"]').should('have.attr', 'aria-disabled', 'true')
  })

  it("Deve listar os repositorios de quem tá seguindo quando clicar no card", () => {
    cy.visit(ROUTES.followingUsers)

    cy.get('.px-8 > :nth-child(1) > .gap-4').click()

    cy.url().should('match', /\/following\/[^/]+\/repos$/)
    cy.contains('h1', 'Fulano de Tal').should('be.visible')
    cy.get('[data-testid="repo-item"]').should('have.length', 5)
  })
})
