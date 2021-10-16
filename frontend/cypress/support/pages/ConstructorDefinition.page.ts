import PDropdownComponentManager from "./component-managers/PDropdownComponentManager";
import ProofStepPage from "./ProofStepPage";

class ConstructorDefinitionPage extends ProofStepPage {

  addGroup = () => cy
    .get("[data-test=new-constructor-button]")
    .click()

  setTermForGroup = (term: string, groupIndex: number) => cy
    .get(`[data-test=constructor-definition-${groupIndex}-term]`)
    .click()
    .clear()
    .type(term);

  setTypeForGroup = (type: string, groupIndex: number) => new PDropdownComponentManager(`[data-test=constructor-definition-${groupIndex}-type]`)
    .setValue(type);

  setFunctionSymbol = (symbol: string, groupIndex: number, functionIndex) => cy
    .get(`[data-test=constructor-definition-${groupIndex}-function-${functionIndex}-symbol]`)
    .click()
    .clear()
    .type(symbol);

  setFunctionArity = (arity: number, groupIndex: number, functionIndex) => cy
    .get(`[data-test=constructor-definition-${groupIndex}-function-${functionIndex}-arity]`)
    .click()
    .clear()
    .type(arity.toString(10));

  addConstructorFunction = (groupIndex: number) => cy
    // [data-test=constructor-definition-0-function-add-button] > .p-button-icon
    .get(`[data-test=constructor-definition-${groupIndex}-function-add-button]`)
    .click();

  clickNextButton = () => cy
    .get('[data-test=constructor-function-def-next-button]')
    .click();

}

export default ConstructorDefinitionPage;
