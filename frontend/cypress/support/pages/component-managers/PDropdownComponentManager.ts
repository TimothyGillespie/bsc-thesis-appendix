class PDropdownComponentManager {
  selector: string

  constructor(selector: string) {
    this.selector = selector;
  }

  setValue = (value: string) => cy
    .get(this.selector)
    .click()
    .contains(value)
    .click();
}

export default PDropdownComponentManager;
