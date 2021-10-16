import ProofStepPage from "./ProofStepPage";

class StatementEnteringPage extends ProofStepPage {

  setStatement = (newStatement: string) => cy
    .get('[data-test=statement-to-prove]')
    .clear()
    .type(newStatement);

  clickNextButton = () => cy
    .get('[data-test=statement-entering-next-button]')
    .click();

  clickBackButton = () => cy
    .get('[data-test=statement-entering-back-button]')
    .click();

  addAdditionalFunction = () => cy
    .get('[data-test=add-additional-function-button]')
    .click();

  setFunctionSymbol = (symbol: string, functionIndex: number) => cy
    .get(`[data-test=additional-function-${functionIndex}-symbol]`)
    .clear()
    .type(symbol);

  setFunctionArity = (arity: number, functionIndex: number) => cy
    .get(`[data-test=additional-function-${functionIndex}-arity]`)
    .clear()
    .type(arity.toString(10));
}

export default StatementEnteringPage;
