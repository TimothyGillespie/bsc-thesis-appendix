import PDropdownComponentManager from "./component-managers/PDropdownComponentManager";
import ProofStepPage from "./ProofStepPage";

class FunctionDefinitionsPage extends ProofStepPage {

  setInputType = (inputType: string, functionName: string, inputTypeIndex: number) => new PDropdownComponentManager(`[data-test=function-${functionName}-input-type-${inputTypeIndex}]`)
    .setValue(inputType);

  setOutputType = (outputType: string, functionName: string) => new PDropdownComponentManager(`[data-test=function-${functionName}-output-type]`)
    .setValue(outputType);

  setVariableName = (name: string, functionName: string, constructorName: string | null, variableIndex: number) => cy
    .get(`[data-test=function-${functionName}-input-constructor-${constructorName ?? 'none'}-variable-name-${variableIndex}]`)
    .clear()
    .type(name);


  setConditionalValue = (value: string, functionName: string, constructorName: string | null, conditionalIndex: number) => cy
    .get(`[data-test=function-${functionName}-input-constructor-${constructorName ?? 'none'}-conditional-${conditionalIndex}-value]`)
    .clear()
    .type(value);

  setConditionalCondition = (condition: string, functionName: string, constructorName: string | null, conditionalIndex: number) => cy
    .get(`[data-test=function-${functionName}-input-constructor-${constructorName ?? 'none'}-conditional-${conditionalIndex}-condition]`)
    .clear()
    .type(condition);

  removeConditional = (functionName: string, constructorName: string | null, conditionalIndex: number) => cy
    .get(`[data-test=function-${functionName}-input-constructor-${constructorName ?? 'none'}-conditional-${conditionalIndex}-remove-button]`)
    .click();

  setOtherwiseValue = (value: string, functionName: string, constructorName: string | null) => cy
    .get(`[data-test=function-${functionName}-input-constructor-${constructorName ?? 'none'}-otherwise-value]`)
    .clear()
    .type(value);

  addConditionalCase = (functionName: string, constructorName: string | null) => cy
    .get(`[data-test=function-${functionName}-input-constructor-${constructorName ?? 'none'}-add-condition-button]`)
    .click();

  clickBackButton = () => cy
    .get('[data-test=function-definition-back-button]')
    .click();

  clickNextButton = () => cy
    .get('[data-test=function-definition-next-button]')
    .click();
}

export default FunctionDefinitionsPage;
