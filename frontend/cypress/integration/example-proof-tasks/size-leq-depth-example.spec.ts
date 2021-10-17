import StartScreenPage from "../../support/pages/StartScreen.page";
import ConstructorDefinitionPage from "../../support/pages/ConstructorDefinition.page";
import StatementEnteringPage from "../../support/pages/StatementEntering.page";
import FunctionDefinitionsPage from "../../support/pages/FunctionDefinitions.page";
import AdditionalConstraintsPage from "../../support/pages/AdditionalConstraints.page";
import ResultPage from "../../support/pages/Result.page";

const startScreen = new StartScreenPage();
const constructorDefinition = new ConstructorDefinitionPage();
const statementEntering = new StatementEnteringPage();
const functionDefinition = new FunctionDefinitionsPage();
const additionalConstraints = new AdditionalConstraintsPage();
const result = new ResultPage();

it('size <= depth example', () => {

    cy.visit('/');

    startScreen.clickStartNewButton();
    constructorDefinition.addGroup();
    constructorDefinition.setTermForGroup('nt', 0);
    constructorDefinition.setTypeForGroup('n-ary tree', 0);

    constructorDefinition.addConstructorFunction(0);
    constructorDefinition.addConstructorFunction(0);

    constructorDefinition.setFunctionSymbol('cBase', 0, 0);
    constructorDefinition.setFunctionArity(0, 0, 0);

    constructorDefinition.setFunctionSymbol('c', 0, 1);
    constructorDefinition.setFunctionArity(2, 0, 1);

    constructorDefinition.clickNextButton();

    statementEntering.setStatement('size(nt) <= depth(nt)')

    statementEntering.addAdditionalFunction()
    statementEntering.setFunctionSymbol('max', 0);
    statementEntering.setFunctionArity(2, 0);

    statementEntering.clickNextButton();

    functionDefinition.setInputType('integer', 'max', 0);
    functionDefinition.setInputType('integer', 'max', 1);
    functionDefinition.setOutputType('integer', 'max');

    functionDefinition.setOutputType('integer', 'depth');

  functionDefinition.setOtherwiseValue('0', 'depth', 'cBase');
  functionDefinition.setVariableName('x', 'depth', 'c', 0);
  functionDefinition.setVariableName('y', 'depth', 'c', 1);
  functionDefinition.setOtherwiseValue('1 + max(depth(x), depth(y))', 'depth', 'c');

  functionDefinition.setOutputType('integer', 'size');
  functionDefinition.setOtherwiseValue('1', 'size', 'cBase')
  functionDefinition.setVariableName('x', 'size', 'c', 0);
  functionDefinition.setVariableName('y', 'size', 'c', 1);
  functionDefinition.setOtherwiseValue('1 + size(x) + size(y)', 'size', 'c');


  functionDefinition.setVariableName('x', 'max', null, 0);
  functionDefinition.setVariableName('y', 'max', null, 1);
  functionDefinition.addConditionalCase('max', null);
  functionDefinition.setConditionalValue('x', 'max', null, 0);
  functionDefinition.setConditionalCondition('x > y', 'max', null, 0);
  functionDefinition.setOtherwiseValue('y', 'max', null);

  functionDefinition.clickNextButton();

  additionalConstraints.clickNextButton();

  result.headerShouldNotSayProven();
  result.clickOnAdditionalConstraintsStep();

  additionalConstraints.clickOnResultStep();

  result.headerShouldNotSayProven();
  result.functionDefinitionsIsSat();
  result.inductiveHypothesisIsSat()
  result.additionalConstraintsIsSat();
  result.inductiveBasisIsUnsat();

})
