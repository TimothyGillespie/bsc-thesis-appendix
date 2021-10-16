import PDropdownComponentManager from "./component-managers/PDropdownComponentManager";
import ProofStepPage from "./ProofStepPage";

class AdditionalConstraintsPage extends ProofStepPage {

  clickNextButton = () => cy
    .get('[data-test=additional-constraints-next-button]')
    .click();

  clickBackButton = () => cy
    .get('[data-test=additional-constraints-back-button]')
    .click();

  addConstraint = () => cy
    .get('[data-test=add-constraint-button]')
    .click();

  removeConstraint = (constraintIndex: number) => cy
    .get(`[data-test=additional-constraint-${constraintIndex}-remove-button]`)
    .click();

  addQuantifiedParameter = (constraintIndex: number) => cy
    .get(`[data-test=additional-constraint-${constraintIndex}-add-quantified-parameter-button]`)
    .click();

  setParameterSymbol = (symbol: string, constraintIndex: number, parameterIndex: number) => cy
    .get(`[data-test=additional-constraint-${constraintIndex}-quantified-parameter-${parameterIndex}-symbol]`)
    .clear()
    .type(symbol);

  setParameterType = (type: string, constraintIndex: number, parameterIndex: number) => new PDropdownComponentManager(`[data-test=additional-constraint-${constraintIndex}-quantified-parameter-${parameterIndex}-type]`)
    .setValue(type);

  removeParameter = (constraintIndex: number, parameterIndex: number) => cy
    .get(`[data-test=additional-constraint-${constraintIndex}-quantified-parameter-${parameterIndex}-remove-button]`)
    .click();

  setConstraintExpression = (expression: string, constraintIndex: number) => cy
    .get(`[data-test=additional-constraint-${constraintIndex}-expression]`)
    .clear()
    .type(expression);
}


export default AdditionalConstraintsPage;
