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

it('not well-defined function f', () => {

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

  statementEntering.setStatement('f(nt)')
  statementEntering.clickNextButton();


  functionDefinition.setOutputType('boolean', 'f');
  functionDefinition.setOtherwiseValue('true', 'f', 'cBase')
  functionDefinition.setVariableName('x', 'f', 'c', 0);
  functionDefinition.setVariableName('y', 'f', 'c', 1);
  functionDefinition.addConditionalCase('f', 'c');
  functionDefinition.addConditionalCase('f', 'c');
  functionDefinition.setConditionalValue('true', 'f', 'c', 0);
  functionDefinition.setConditionalCondition('true', 'f', 'c', 0);
  functionDefinition.setConditionalValue('false', 'f', 'c', 1);
  functionDefinition.setConditionalCondition('true', 'f', 'c', 1);
  functionDefinition.setOtherwiseValue('true', 'f', 'c');

  functionDefinition.clickNextButton();

  additionalConstraints.clickNextButton();

  result.headerShouldNotSayProven();
  result.functionDefinitionsIsUnsat();
})
