import Page from "./Page";
import PConfirmPopupManager from "./component-managers/PConfirmPopupManager";

class StartScreenPage extends Page {

  getStartNewButton = () => cy
    .get("[data-test=start-new-button]");

  getContinueButton = () => cy
    .get("[data-test=continue-button]");

  getHowToButton = () => cy
    .get("[data-test=how-to-button]")

  getContinueAndDeleteButton = () => new  PConfirmPopupManager()
    .getAcceptButton();

  deleteAndContinue = () => this.getContinueAndDeleteButton()
    .click();

  getCancelDeletionButton = () => new PConfirmPopupManager()
    .getRejectButton();

  cancelDeletion = () => this.getCancelDeletionButton()
    .click();

  clickStartNewButton = () => this.getStartNewButton()
    .click();

  clickContinueButton = () => this.getContinueButton()
    .click();

  clickHowToButton = () => this.getHowToButton()
    .click();


}

export default StartScreenPage;
