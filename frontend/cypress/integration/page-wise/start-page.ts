import StartScreenPage from "../../support/pages/StartScreen.page";

const startScreen = new StartScreenPage();

describe('Start page test', () => {
  it('unpopulated storage state', () => {
    cy.visit('/');
    startScreen.getStartNewButton().should('exist');
    startScreen.getContinueButton().should('not.exist');
    startScreen.getHowToButton().should('exist');

    startScreen.clickStartNewButton();
    cy.url().should('contain', 'constructor-definitions');
  });

  it('populated storage state', () => {
    localStorage.setItem('additionalConstraints', '[]');
    cy.visit('/').then(() => {
      expect(localStorage.getItem('additionalConstraints')).to.equal('[]');
    });

    startScreen.getStartNewButton().should('exist');
    startScreen.getContinueButton().should('exist');
    startScreen.getHowToButton().should('exist');

    startScreen.clickStartNewButton();
    cy.url().should('not.contain', 'constructor-definitions');
    startScreen.getCancelDeletionButton().should('exist');
    startScreen.getContinueAndDeleteButton().should('exist');

    startScreen.cancelDeletion();
    cy.url().should('not.contain', 'constructor-definitions');
    startScreen.getCancelDeletionButton().should('not.exist');
    startScreen.getContinueAndDeleteButton().should('not.exist');

    startScreen.clickContinueButton();
    cy.url().should('contain', 'constructor-definitions').then(() => {
      expect(localStorage.getItem('additionalConstraints')).to.equal('[]');
    });


    cy.go('back').then(() => {
      expect(localStorage.getItem('additionalConstraints')).to.equal('[]');
    });

    startScreen.clickStartNewButton().then(() => {
      expect(localStorage.getItem('additionalConstraints')).to.equal('[]');
    });
    startScreen.deleteAndContinue().then(() => {
      expect(localStorage.getItem('additionalConstraints')).to.be.null;
    });

  });
});
