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

it('size = 1 + edgeCount example', () => {

    cy.visit('/');

    startScreen.clickStartNewButton();
    constructorDefinition.addGroup();
    constructorDefinition.setTermForGroup('nt', 0);
    constructorDefinition.setTypeForGroup('n-ary tree', 0);

    constructorDefinition.addConstructorFunction(0);
    constructorDefinition.addConstructorFunction(0);
    constructorDefinition.addConstructorFunction(0);
    constructorDefinition.addConstructorFunction(0);

    constructorDefinition.setFunctionSymbol('cBase1', 0, 0);
    constructorDefinition.setFunctionArity(0, 0, 0);

    constructorDefinition.setFunctionSymbol('cBase2', 0, 1);
    constructorDefinition.setFunctionArity(0, 0, 1);

    constructorDefinition.setFunctionSymbol('c1', 0, 2);
    constructorDefinition.setFunctionArity(2, 0, 2);

    constructorDefinition.setFunctionSymbol('c2', 0, 3);
    constructorDefinition.setFunctionArity(2, 0, 3);

    constructorDefinition.clickNextButton();

    statementEntering.setStatement('size(nt) = 1 + edgeCount(nt)')
    statementEntering.clickNextButton();

    functionDefinition.setOutputType('integer', 'edgeCount');
    functionDefinition.setOtherwiseValue('0', 'edgeCount', 'cBase1');
    functionDefinition.setOtherwiseValue('0', 'edgeCount', 'cBase2');
    functionDefinition.setOtherwiseValue('2 + edgeCount(x1) + edgeCount(x2)', 'edgeCount', 'c1');
    functionDefinition.setOtherwiseValue('2 + edgeCount(x1) + edgeCount(x2)', 'edgeCount', 'c2');

    functionDefinition.setOutputType('integer', 'size');
    functionDefinition.setOtherwiseValue('1', 'size', 'cBase1')
    functionDefinition.setOtherwiseValue('1', 'size', 'cBase2')
    functionDefinition.setOtherwiseValue('1 + size(x1) + size(x2)', 'size', 'c1');
    functionDefinition.setOtherwiseValue('1 + size(x1) + size(x2)', 'size', 'c2');

    functionDefinition.clickNextButton();

    additionalConstraints.clickNextButton();

    result.headerShouldSayProven();
});
