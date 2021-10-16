import Page from "./Page";

class ProofStepPage extends Page {

  clickOnConstructorDefinitionsStep = () => cy
    .get(':nth-child(1) > .p-menuitem-link')
    .click();


  clickOnStatementStep = () => cy
    .get(':nth-child(2) > .p-menuitem-link')
    .click();

  clickOnFunctionDefinitonsStep = () => cy
    .get(':nth-child(3) > .p-menuitem-link')
    .click();

  clickOnAdditionalConstraintsStep = () => cy
    .get(':nth-child(4) > .p-menuitem-link')
    .click();

  clickOnResultStep = () => cy
    .get(':nth-child(5) > .p-menuitem-link')
    .click();
}

export default ProofStepPage;
