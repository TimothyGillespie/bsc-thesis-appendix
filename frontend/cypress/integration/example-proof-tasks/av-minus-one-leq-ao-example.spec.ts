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

it('av - 1 <= ao example', () => {
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


  statementEntering.setStatement('AV(pf) - 1 <= AO(pf)');
  statementEntering.clickNextButton();


  functionDefinition.setOutputType('integer', 'AV');
  functionDefinition.setOtherwiseValue('1', 'AV', 'lvariable');
  functionDefinition.setOtherwiseValue('0', 'AV', 'falsum');
  functionDefinition.setOtherwiseValue('0', 'AV', 'verum');
  functionDefinition.setOtherwiseValue('AV(x1)', 'AV', 'lnot');
  functionDefinition.setOtherwiseValue('AV(x1) + AV(x2)', 'AV', 'land');
  functionDefinition.setOtherwiseValue('AV(x1) + AV(x2)', 'AV', 'lor');
  functionDefinition.setOtherwiseValue('AV(x1) + AV(x2)', 'AV', 'lImplicationRight');
  functionDefinition.setOtherwiseValue('AV(x1) + AV(x2)', 'AV', 'lImplicationLeft');
  functionDefinition.setOtherwiseValue('AV(x1) + AV(x2)', 'AV', 'lEquivalency');

  functionDefinition.setOutputType('integer', 'AO');
  functionDefinition.setOtherwiseValue('0', 'AO', 'lvariable');
  functionDefinition.setOtherwiseValue('0', 'AO', 'falsum');
  functionDefinition.setOtherwiseValue('0', 'AO', 'verum');
  functionDefinition.setOtherwiseValue('1 + AO(x1)', 'AO', 'lnot');
  functionDefinition.setOtherwiseValue('1 + AO(x1) + AO(x2)', 'AO', 'land');
  functionDefinition.setOtherwiseValue('1 + AO(x1) + AO(x2)', 'AO', 'lor');
  functionDefinition.setOtherwiseValue('1 + AO(x1) + AO(x2)', 'AO', 'lImplicationRight');
  functionDefinition.setOtherwiseValue('1 + AO(x1) + AO(x2)', 'AO', 'lImplicationLeft');
  functionDefinition.setOtherwiseValue('1 + AO(x1) + AO(x2)', 'AO', 'lEquivalency');

  functionDefinition.clickNextButton();


  additionalConstraints.clickNextButton();
  result.headerShouldSayProven();
});
