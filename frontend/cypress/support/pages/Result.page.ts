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


}

export default ResultPage;
