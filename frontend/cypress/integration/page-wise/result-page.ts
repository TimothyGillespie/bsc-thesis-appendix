import ResultPage from "cypress/support/pages/Result.page";

const result = new ResultPage();

describe('Result page tests', () => {
  it('For inconclusive results', () => {
    cy.server();
    cy.route('POST', '**/result', 'fixture:inconclusive-result.json');
    cy.visit('/finish');
    result.headerShouldSayInconclusive();
    result.inductiveStepIsUnknown();
  });

  it('For proven result', () => {
    cy.server();
    cy.route('POST', '**/result', 'fixture:proven-result.json');
    cy.visit('/finish');
    result.headerShouldSayProven();
    result.inductiveStepIsUnsat();
  });

  it('For not proven result', () => {
    cy.server();
    cy.route('POST', '**/result', 'fixture:not-proven-result.json');
    cy.visit('/finish');
    result.headerShouldNotSayProven();
    result.inductiveStepIsSat();
  });

  it('Displays all satisfiable correctly', () => {
    cy.server();
    cy.route('POST', '**/result', 'fixture:all-sat-result.json');
    cy.visit('/finish');
    result.headerShouldNotSayProven();
    result.functionDefinitionsIsSat();
    result.inductiveHypothesisIsSat();
    result.additionalConstraintsIsSat();
    result.inductiveBasisIsSat();
    result.inductiveStepIsSat();
  })

  it('Displays all unsatisfiable correctly', () => {
    cy.server();
    cy.route('POST', '**/result', 'fixture:all-unsat-result.json');
    cy.visit('/finish');
    result.headerShouldSayProven();
    result.functionDefinitionsIsUnsat();
    result.inductiveHypothesisIsUnsat();
    result.additionalConstraintsIsUnsat();
    result.inductiveBasisIsUnsat();
    result.inductiveStepIsUnsat();
  })

  it('Displays all unknown correctly', () => {
    cy.server();
    cy.route('POST', '**/result', 'fixture:all-unknown-result.json');
    cy.visit('/finish');
    result.headerShouldSayInconclusive();
    result.functionDefinitionsIsUnknown();
    result.inductiveHypothesisIsUnknown();
    result.additionalConstraintsIsUnknown();
    result.inductiveBasisIsUnknown();
    result.inductiveStepIsUnknown();
  })

});
