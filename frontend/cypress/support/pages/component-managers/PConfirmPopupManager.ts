class PConfirmPopupManager {
  getAcceptButton = () => cy
    .get('.p-confirm-popup-accept');

  getRejectButton = () => cy
    .get('.p-confirm-popup-reject');

  accept = () => this.getAcceptButton()
    .click();

  reject = () => this.getRejectButton()
    .click();
}

export default PConfirmPopupManager
