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

it('parenthesisCount = 2 * operatorCount example', () => {
  cy.visit('/');
  startScreen.clickStartNewButton();
  constructorDefinition.addGroup();

  constructorDefinition.setTermForGroup('pf', 0);
  constructorDefinition.setTypeForGroup('formula of propositional logic', 0);

  constructorDefinition.addConstructorFunction(0);
  constructorDefinition.addConstructorFunction(0);
  constructorDefinition.addConstructorFunction(0);
  constructorDefinition.addConstructorFunction(0);
  constructorDefinition.addConstructorFunction(0);
  constructorDefinition.addConstructorFunction(0);
  constructorDefinition.addConstructorFunction(0);

  constructorDefinition.setFunctionSymbol('lvariable', 0, 0);
  constructorDefinition.setFunctionArity(0, 0, 0);

  constructorDefinition.setFunctionSymbol('lnot', 0, 1)
  constructorDefinition.setFunctionArity(1, 0, 1);

  constructorDefinition.setFunctionSymbol('land', 0, 2)
  constructorDefinition.setFunctionArity(2, 0, 2);

  constructorDefinition.setFunctionSymbol('lor', 0, 3)
  constructorDefinition.setFunctionArity(2, 0, 3);

  constructorDefinition.setFunctionSymbol('lImplicationRight', 0, 4)
  constructorDefinition.setFunctionArity(2, 0, 4);

  constructorDefinition.setFunctionSymbol('lImplicationLeft', 0, 5)
  constructorDefinition.setFunctionArity(2, 0, 5);

  constructorDefinition.setFunctionSymbol('lEquivalency', 0, 6)
  constructorDefinition.setFunctionArity(2, 0, 6);

  constructorDefinition.clickNextButton();


  statementEntering.setStatement('parenthesisCount(pf) = 2 * operatorCount(pf)');
  statementEntering.clickNextButton();


  functionDefinition.setOutputType('integer', 'parenthesisCount');

  functionDefinition.setOtherwiseValue('0', 'parenthesisCount', 'lvariable');
  functionDefinition.setOtherwiseValue('2 + parenthesisCount(x1)', 'parenthesisCount', 'lnot');
  functionDefinition.setOtherwiseValue('2 + parenthesisCount(x1) + parenthesisCount(x2)', 'parenthesisCount', 'land');
  functionDefinition.setOtherwiseValue('2 + parenthesisCount(x1) + parenthesisCount(x2)', 'parenthesisCount', 'lor');
  functionDefinition.setOtherwiseValue('2 + parenthesisCount(x1) + parenthesisCount(x2)', 'parenthesisCount', 'lImplicationRight');
  functionDefinition.setOtherwiseValue('2 + parenthesisCount(x1) + parenthesisCount(x2)', 'parenthesisCount', 'lImplicationLeft');
  functionDefinition.setOtherwiseValue('2 + parenthesisCount(x1) + parenthesisCount(x2)', 'parenthesisCount', 'lEquivalency');

  functionDefinition.setOutputType('integer', 'operatorCount');
  functionDefinition.setOtherwiseValue('0', 'operatorCount', 'lvariable');
  functionDefinition.setOtherwiseValue('1 + operatorCount(x1)', 'operatorCount', 'lnot');
  functionDefinition.setOtherwiseValue('1 + operatorCount(x1) + operatorCount(x2)', 'operatorCount', 'land');
  functionDefinition.setOtherwiseValue('1 + operatorCount(x1) + operatorCount(x2)', 'operatorCount', 'lor');
  functionDefinition.setOtherwiseValue('1 + operatorCount(x1) + operatorCount(x2)', 'operatorCount', 'lImplicationRight');
  functionDefinition.setOtherwiseValue('1 + operatorCount(x1) + operatorCount(x2)', 'operatorCount', 'lImplicationLeft');
  functionDefinition.setOtherwiseValue('1 + operatorCount(x1) + operatorCount(x2)', 'operatorCount', 'lEquivalency');

  functionDefinition.clickNextButton();


  additionalConstraints.clickNextButton();
  result.headerShouldSayProven();
})
