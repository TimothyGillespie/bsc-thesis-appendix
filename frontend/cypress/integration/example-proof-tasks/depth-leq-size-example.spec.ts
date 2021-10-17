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

it('depth <= size example with max function', () => {

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

    statementEntering.setStatement('depth(nt) <= size(nt)')

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
    // @ts-ignore
    result.getCounterExample().invoke('text').snapshot();

    result.clickOnAdditionalConstraintsStep();

    additionalConstraints.addConstraint();
    additionalConstraints.addQuantifiedParameter(0);
    additionalConstraints.setParameterSymbol('x', 0, 0);
    additionalConstraints.setParameterType('n-ary tree', 0, 0);
    additionalConstraints.setConstraintExpression('0 <= depth(x)', 0);

    additionalConstraints.clickOnResultStep();

    result.headerShouldSayProven();
    result.clickOnAdditionalConstraintsStep();

    additionalConstraints.removeConstraint(0);
    additionalConstraints.clickOnResultStep();

    result.headerShouldNotSayProven();
    result.clickOnStatementStep();

    statementEntering.setStatement('(depth(nt) <= size(nt)) and (0 <= depth(nt))');
    statementEntering.clickOnResultStep();

    result.headerShouldSayProven();

})


it('depth <= size example without max function', () => {

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

  statementEntering.setStatement('depth(nt) <= size(nt)')
  statementEntering.clickNextButton();

  functionDefinition.setOutputType('integer', 'depth');
  functionDefinition.setOtherwiseValue('0', 'depth', 'cBase');
  functionDefinition.addConditionalCase('depth', 'c')
  functionDefinition.setVariableName('x', 'depth', 'c', 0);
  functionDefinition.setVariableName('y', 'depth', 'c', 1);
  functionDefinition.setConditionalValue('1 + depth(x)', 'depth', 'c', 0);
  functionDefinition.setConditionalCondition('depth(x) > depth(y)', 'depth', 'c', 0);
  functionDefinition.setOtherwiseValue('1 + depth(y)', 'depth', 'c');

  functionDefinition.setOutputType('integer', 'size');
  functionDefinition.setOtherwiseValue('1', 'size', 'cBase')
  functionDefinition.setVariableName('x', 'size', 'c', 0);
  functionDefinition.setVariableName('y', 'size', 'c', 1);
  functionDefinition.setOtherwiseValue('1 + size(x) + size(y)', 'size', 'c');

  functionDefinition.clickNextButton();

  additionalConstraints.clickNextButton();

  result.headerShouldNotSayProven();
  // @ts-ignore
  result.getCounterExample().invoke('text').snapshot();


  result.clickOnAdditionalConstraintsStep();

  additionalConstraints.addConstraint();
  additionalConstraints.addQuantifiedParameter(0);
  additionalConstraints.setParameterSymbol('x', 0, 0);
  additionalConstraints.setParameterType('n-ary tree', 0, 0);
  additionalConstraints.setConstraintExpression('0 <= depth(x)', 0);

  additionalConstraints.clickOnResultStep();

  result.headerShouldSayProven();
  result.clickOnAdditionalConstraintsStep();

  additionalConstraints.removeConstraint(0);
  additionalConstraints.clickOnResultStep();

  result.headerShouldNotSayProven();
  result.clickOnStatementStep();

  statementEntering.setStatement('(depth(nt) <= size(nt)) and (0 <= depth(nt))');
  statementEntering.clickOnResultStep();

  result.headerShouldSayProven();
})


it('depth <= size example with max function (propositional logic)', () => {

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

  statementEntering.setStatement('depth(pf) <= size(pf)')

  statementEntering.addAdditionalFunction()
  statementEntering.setFunctionSymbol('max', 0);
  statementEntering.setFunctionArity(2, 0);

  statementEntering.clickNextButton();

  functionDefinition.setOutputType('integer', 'depth');
  functionDefinition.setOtherwiseValue('0', 'depth', 'lvariable')
  functionDefinition.setOtherwiseValue('1 + depth(x1)', 'depth', 'lnot');
  functionDefinition.setOtherwiseValue('1 + max(depth(x1), depth(x2))', 'depth', 'land');
  functionDefinition.setOtherwiseValue('1 + max(depth(x1), depth(x2))', 'depth', 'lor');
  functionDefinition.setOtherwiseValue('1 + max(depth(x1), depth(x2))', 'depth', 'lImplicationRight');
  functionDefinition.setOtherwiseValue('1 + max(depth(x1), depth(x2))', 'depth', 'lImplicationLeft');
  functionDefinition.setOtherwiseValue('1 + max(depth(x1), depth(x2))', 'depth', 'lEquivalency');

  functionDefinition.setOutputType('integer', 'size');
  functionDefinition.setOtherwiseValue('1', 'size', 'lvariable')
  functionDefinition.setOtherwiseValue('1 + size(x1)', 'size', 'lnot');
  functionDefinition.setOtherwiseValue('1 + size(x1) + size(x2)', 'size', 'land');
  functionDefinition.setOtherwiseValue('1 + size(x1) + size(x2)', 'size', 'lor');
  functionDefinition.setOtherwiseValue('1 + size(x1) + size(x2)', 'size', 'lImplicationRight');
  functionDefinition.setOtherwiseValue('1 + size(x1) + size(x2)', 'size', 'lImplicationLeft');
  functionDefinition.setOtherwiseValue('1 + size(x1) + size(x2)', 'size', 'lEquivalency');

  functionDefinition.setInputType('integer', 'max', 0);
  functionDefinition.setInputType('integer', 'max', 1);
  functionDefinition.setOutputType('integer', 'max');
  functionDefinition.setVariableName('x', 'max', null, 0);
  functionDefinition.setVariableName('y', 'max', null, 1);
  functionDefinition.addConditionalCase('max', null);
  functionDefinition.setConditionalValue('x', 'max', null, 0);
  functionDefinition.setConditionalCondition('x > y', 'max', null, 0);
  functionDefinition.setOtherwiseValue('y', 'max', null);

  functionDefinition.clickNextButton();

  additionalConstraints.clickNextButton();

  result.headerShouldNotSayProven();
  // @ts-ignore
  result.getCounterExample().invoke('text').snapshot();

  result.clickOnAdditionalConstraintsStep();

  additionalConstraints.addConstraint();
  additionalConstraints.addQuantifiedParameter(0);
  additionalConstraints.setParameterSymbol('x', 0, 0);
  additionalConstraints.setParameterType('formula of propositional logic', 0, 0);
  additionalConstraints.setConstraintExpression('0 <= depth(x)', 0);

  additionalConstraints.clickOnResultStep();

  result.headerShouldSayProven();
  result.clickOnAdditionalConstraintsStep();

  additionalConstraints.removeConstraint(0);
  additionalConstraints.clickOnResultStep();

  result.headerShouldNotSayProven();
  result.clickOnStatementStep();

  statementEntering.setStatement('(depth(pf) <= size(pf)) and (0 <= depth(pf))');
  statementEntering.clickOnResultStep();

  result.headerShouldSayProven();
  result.clickOnStatementStep();
  statementEntering.setStatement('(1+depth(pf) <= size(pf)) and (0 <= depth(pf))')

  statementEntering.clickOnResultStep();

  result.headerShouldSayProven();
})
