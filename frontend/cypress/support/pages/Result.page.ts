import ProofStepPage from "./ProofStepPage";

class ResultPage extends ProofStepPage {

  headerShouldSayProven = () => cy
    .get('[data-test=result-header]')
    .should('include.text', 'The statement is correct!');

  headerShouldNotSayProven = () => cy
    .get('[data-test=result-header]')
    .should('have.text', 'The statement could not be proven');

   headerShouldSayInconclusive = () => cy
    .get('[data-test=result-header]')
    .should('have.text', 'The statement has been understood but the result could not be calculated.');


   private stepIsSatisifable = (step: string) => cy
     .get(`[data-test=${step}]`)
     .should('have.class', 'pi-check');

  private stepIsUnsatisifable = (step: string) => cy
    .get(`[data-test=${step}]`)
    .should('have.class', 'pi-times');

  private stepIsUnknown = (step: string) => cy
    .get(`[data-test=${step}]`)
    .should('have.class', 'pi-question-circle');

  private stepNameFunctionDefinitions = 'sat-function-definitions';
  private stepNameInductiveHypothesis = 'sat-inductive-hypothesis';
  private stepNameAdditionalConstraints = 'sat-additional-constraints';
  private stepNameInductiveBasis = 'sat-inductive-basis';
  private stepNameInductiveStep = 'sat-inductive-step';

  functionDefinitionsIsSat = () => this.stepIsSatisifable(this.stepNameFunctionDefinitions);
  inductiveHypothesisIsSat = () => this.stepIsSatisifable(this.stepNameInductiveHypothesis);
  additionalConstraintsIsSat = () => this.stepIsSatisifable(this.stepNameAdditionalConstraints);
  inductiveBasisIsSat = () => this.stepIsSatisifable(this.stepNameInductiveBasis);
  inductiveStepIsSat = () => this.stepIsSatisifable(this.stepNameInductiveStep);

  functionDefinitionsIsUnsat = () => this.stepIsUnsatisifable(this.stepNameFunctionDefinitions);
  inductiveHypothesisIsUnsat = () => this.stepIsUnsatisifable(this.stepNameInductiveHypothesis);
  additionalConstraintsIsUnsat = () => this.stepIsUnsatisifable(this.stepNameAdditionalConstraints);
  inductiveBasisIsUnsat = () => this.stepIsUnsatisifable(this.stepNameInductiveBasis);
  inductiveStepIsUnsat = () => this.stepIsUnsatisifable(this.stepNameInductiveStep);

  functionDefinitionsIsUnknown = () => this.stepIsUnknown(this.stepNameFunctionDefinitions);
  inductiveHypothesisIsUnknown = () => this.stepIsUnknown(this.stepNameInductiveHypothesis);
  additionalConstraintsIsUnknown = () => this.stepIsUnknown(this.stepNameAdditionalConstraints);
  inductiveBasisIsUnknown = () => this.stepIsUnknown(this.stepNameInductiveBasis);
  inductiveStepIsUnknown = () => this.stepIsUnknown(this.stepNameInductiveStep);

}

export default ResultPage;
