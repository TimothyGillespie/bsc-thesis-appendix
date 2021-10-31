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

    constructorDefinition.setFunctionSymbol('cBaseOne', 0, 0);
    constructorDefinition.setFunctionArity(0, 0, 0);

    constructorDefinition.setFunctionSymbol('cBaseTwo', 0, 1);
    constructorDefinition.setFunctionArity(0, 0, 1);

    constructorDefinition.setFunctionSymbol('cOne', 0, 2);
    constructorDefinition.setFunctionArity(2, 0, 2);

    constructorDefinition.setFunctionSymbol('cTwo', 0, 3);
    constructorDefinition.setFunctionArity(2, 0, 3);

    constructorDefinition.clickNextButton();

    statementEntering.setStatement('size(nt) = 1 + edgeCount(nt)')
    statementEntering.clickNextButton();

    functionDefinition.setOutputType('integer', 'edgeCount');
    functionDefinition.setOtherwiseValue('0', 'edgeCount', 'cBaseOne');
    functionDefinition.setOtherwiseValue('0', 'edgeCount', 'cBaseTwo');
    functionDefinition.setOtherwiseValue('2 + edgeCount(x1) + edgeCount(x2)', 'edgeCount', 'cOne');
    functionDefinition.setOtherwiseValue('2 + edgeCount(x1) + edgeCount(x2)', 'edgeCount', 'cTwo');

    functionDefinition.setOutputType('integer', 'size');
    functionDefinition.setOtherwiseValue('1', 'size', 'cBaseOne')
    functionDefinition.setOtherwiseValue('1', 'size', 'cBaseTwo')
    functionDefinition.setOtherwiseValue('1 + size(x1) + size(x2)', 'size', 'cOne');
    functionDefinition.setOtherwiseValue('1 + size(x1) + size(x2)', 'size', 'cTwo');

    functionDefinition.clickNextButton();

    additionalConstraints.clickNextButton();

    result.headerShouldSayProven();
});
