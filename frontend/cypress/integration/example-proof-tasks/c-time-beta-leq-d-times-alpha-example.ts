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

it('c * beta <= d * alpha example', () => {
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

  constructorDefinition.setFunctionSymbol('falsum', 0, 7);
  constructorDefinition.setFunctionArity(0, 0, 7);

  constructorDefinition.setFunctionSymbol('verum', 0, 8);
  constructorDefinition.setFunctionArity(0, 0, 8);


  constructorDefinition.clickNextButton();


  statementEntering.setStatement('c * beta(pf) <= d * alpha(pf)');
  statementEntering.clickNextButton();


  functionDefinition.setOutputType('integer', 'c');
  functionDefinition.setOutputType('integer', 'd');

  functionDefinition.setOutputType('integer', 'alpha');
  functionDefinition.setOtherwiseValue('c', 'alpha', 'lvariable');
  functionDefinition.setOtherwiseValue('c', 'alpha', 'falsum');
  functionDefinition.setOtherwiseValue('c', 'alpha', 'verum');
  functionDefinition.setOtherwiseValue('c + alpha(x1)', 'alpha', 'lnot');
  functionDefinition.setOtherwiseValue('c + alpha(x1) + alpha(x2)', 'alpha', 'land');
  functionDefinition.setOtherwiseValue('c + alpha(x1) + alpha(x2)', 'alpha', 'lor');
  functionDefinition.setOtherwiseValue('c + alpha(x1) + alpha(x2)', 'alpha', 'lImplicationRight');
  functionDefinition.setOtherwiseValue('c + alpha(x1) + alpha(x2)', 'alpha', 'lImplicationLeft');
  functionDefinition.setOtherwiseValue('c + alpha(x1) + alpha(x2)', 'alpha', 'lEquivalency');

  functionDefinition.setOutputType('integer', 'beta');
  functionDefinition.setOtherwiseValue('0', 'beta', 'lvariable');
  functionDefinition.setOtherwiseValue('0', 'beta', 'falsum');
  functionDefinition.setOtherwiseValue('0', 'beta', 'verum');
  functionDefinition.setOtherwiseValue('d + beta(x1)', 'beta', 'lnot');
  functionDefinition.setOtherwiseValue('d + beta(x1) + beta(x2)', 'beta', 'land');
  functionDefinition.setOtherwiseValue('d + beta(x1) + beta(x2)', 'beta', 'lor');
  functionDefinition.setOtherwiseValue('d + beta(x1) + beta(x2)', 'beta', 'lImplicationRight');
  functionDefinition.setOtherwiseValue('d + beta(x1) + beta(x2)', 'beta', 'lImplicationLeft');
  functionDefinition.setOtherwiseValue('d + beta(x1) + beta(x2)', 'beta', 'lEquivalency');

  functionDefinition.clickNextButton();


  additionalConstraints.clickNextButton();
  result.headerShouldSayProven();
});
