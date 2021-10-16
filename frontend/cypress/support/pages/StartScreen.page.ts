import Page from "./Page";

class StartScreenPage extends Page {

  clickStartNewButton = () => cy
    .get("[data-test=start-new-button]")
    .click()


}

export default StartScreenPage;
