import { ROUTES } from '../../src/modules/shared/routes';

describe('Lista de repositórios', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve listar os repositórios do usuário e navegar entre páginas', () => {
    cy.visit(ROUTES.repositories);

    cy.contains('h1', 'Meus repositórios').should('be.visible');
    cy.get('[data-testid="repo-item"]').should('have.length', 5);
    cy.contains('repo-1').should('exist');

    // Vai para a página 2
    cy.get('[data-testid="pagination-next"]').click();

    cy.get('[data-testid="repo-item"]').should('have.length', 5);
    cy.contains('repo-6').should('exist');
    cy.get('[data-testid="repo-item"]')
      .contains(/^repo-1$/)
      .should('not.exist');

    // Vai para a página 3
    cy.get('[data-testid="pagination-next"]').click();

    cy.get('[data-testid="repo-item"]').should('have.length', 5);
    cy.contains('repo-11').should('exist');
    cy.get('[data-testid="repo-item"]')
      .contains(/^repo-10$/)
      .should('not.exist');

    // Volta para a página 2
    cy.get('[data-testid="pagination-prev"]').click();

    cy.get('[data-testid="repo-item"]').should('have.length', 5);
    cy.contains('repo-6').should('exist');
    cy.get('[data-testid="repo-item"]')
      .contains(/^repo-1$/)
      .should('not.exist');

    // Volta para a página 1
    cy.get('[data-testid="pagination-prev"]').click();

    cy.get('[data-testid="repo-item"]').should('have.length', 5);
    cy.contains('repo-1').should('exist');
  });
});
