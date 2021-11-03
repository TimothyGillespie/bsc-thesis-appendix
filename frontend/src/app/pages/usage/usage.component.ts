import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {ConfirmationService} from "primeng/api";
import {StepDisplayService} from "../../services/step-display/step-display.service";
import {ValidationHintService} from "../../services/validation-hint/validation-hint.service";

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit {

  exampleOptions: Example[] = [
    {name: 'Binary Tree Example (recommended)', value: 'tree'},
    {name: 'Propositional Logic Formula Example', value: 'logic'},
  ]
  chosenExample: ExampleValue = 'tree'

  constructor(
    private router: Router,
    public requestData: RequestDataService,
    private confirmationService: ConfirmationService,
    private stepDisplay: StepDisplayService,
    private validationHintService: ValidationHintService,
  ) {
    this.stepDisplay.showSteps = false;
    this.stepDisplay.activeIndex = 0;
  }

  ngOnInit(): void {
  }

  getChosenExampleObject(): Example {
    return this.exampleOptions.find(element => element.value === this.chosenExample)
  }

  sendExampleError() {
    this.validationHintService.sendHint('I am an error toast.')
  }

  getExample(exampleId: string): string {
    return `/assets/images/specific-examples/${this.chosenExample}/${exampleId}.png`;
  }

  loadSelectedExample(event: Event, force: boolean) {
    if(!this.requestData.isPristine() && !force) {
      this.confirmationService.confirm({
        target: event.target,
        key: 'confirmPopup',
        message: 'You currently have an on-going process which will be deleted if you continue.',
        acceptLabel: 'Delete and Continue',
        rejectLabel: 'Cancel',
        acceptButtonStyleClass: 'p-button-danger',
        accept: () => this.loadSelectedExample(event, true),
      })
    } else {
      if(this.chosenExample === 'logic') {
        this.requestData.constructorDefinitions.next([{"term":"f","type":"PLFormula","functions":[{"symbol":"LVariable","arity": 0},{"symbol":"LNot","arity":1},{"symbol":"LOr","arity":2},{"symbol":"LAnd","arity":2},{"symbol":"LImplication","arity":2},{"symbol":"LEquivalency","arity":2}]}])
        this.requestData.statementString.next('parenthesisCount(f) = 2 * operatorCount(f)')
        this.requestData.additionalFunctions.next([]);
        this.requestData.functionDefinitions.next([{"name":"operatorCount","arity":1,"inputTypes":["PLFormula"],"outputType":"Int","definition":[{"inputConstructor":{"name":"LVariable","arity": "0","boundVariables":[]},"conditional":[],"otherwise":{"symbol":"1","parameters":[]}},{"inputConstructor":{"name":"LNot","arity":"1","boundVariables":["x1"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"1","parameters":[]},{"symbol":"operatorCount","parameters":[{"symbol":"x1","parameters":[]}]}]}},{"inputConstructor":{"name":"LOr","arity":"2","boundVariables":["x1","x2"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"1","parameters":[]},{"symbol":"+","parameters":[{"symbol":"operatorCount","parameters":[{"symbol":"x1","parameters":[]}]},{"symbol":"operatorCount","parameters":[{"symbol":"x2","parameters":[]}]}]}]}},{"inputConstructor":{"name":"LAnd","arity":"2","boundVariables":["x1","x2"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"1","parameters":[]},{"symbol":"+","parameters":[{"symbol":"operatorCount","parameters":[{"symbol":"x1","parameters":[]}]},{"symbol":"operatorCount","parameters":[{"symbol":"x2","parameters":[]}]}]}]}},{"inputConstructor":{"name":"LImplication","arity":"2","boundVariables":["x1","x2"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"1","parameters":[]},{"symbol":"+","parameters":[{"symbol":"operatorCount","parameters":[{"symbol":"x1","parameters":[]}]},{"symbol":"operatorCount","parameters":[{"symbol":"x2","parameters":[]}]}]}]}},{"inputConstructor":{"name":"LEquivalency","arity":"2","boundVariables":["x1","x2"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"1","parameters":[]},{"symbol":"+","parameters":[{"symbol":"operatorCount","parameters":[{"symbol":"x1","parameters":[]}]},{"symbol":"operatorCount","parameters":[{"symbol":"x2","parameters":[]}]}]}]}}]},{"name":"parenthesisCount","arity":1,"inputTypes":["PLFormula"],"outputType":"Int","definition":[{"inputConstructor":{"name":"LVariable","arity":"0","boundVariables":[]},"conditional":[],"otherwise":{"symbol":"2","parameters":[]}},{"inputConstructor":{"name":"LNot","arity":"1","boundVariables":["x1"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"2","parameters":[]},{"symbol":"parenthesisCount","parameters":[{"symbol":"x1","parameters":[]}]}]}},{"inputConstructor":{"name":"LOr","arity":"2","boundVariables":["x1","x2"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"2","parameters":[]},{"symbol":"+","parameters":[{"symbol":"parenthesisCount","parameters":[{"symbol":"x1","parameters":[]}]},{"symbol":"parenthesisCount","parameters":[{"symbol":"x2","parameters":[]}]}]}]}},{"inputConstructor":{"name":"LAnd","arity":"2","boundVariables":["x1","x2"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"2","parameters":[]},{"symbol":"+","parameters":[{"symbol":"parenthesisCount","parameters":[{"symbol":"x1","parameters":[]}]},{"symbol":"parenthesisCount","parameters":[{"symbol":"x2","parameters":[]}]}]}]}},{"inputConstructor":{"name":"LImplication","arity":"2","boundVariables":["x1","x2"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"2","parameters":[]},{"symbol":"+","parameters":[{"symbol":"parenthesisCount","parameters":[{"symbol":"x1","parameters":[]}]},{"symbol":"parenthesisCount","parameters":[{"symbol":"x2","parameters":[]}]}]}]}},{"inputConstructor":{"name":"LEquivalency","arity":"2","boundVariables":["x1","x2"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"2","parameters":[]},{"symbol":"+","parameters":[{"symbol":"parenthesisCount","parameters":[{"symbol":"x1","parameters":[]}]},{"symbol":"parenthesisCount","parameters":[{"symbol":"x2","parameters":[]}]}]}]}}]}])
        this.requestData.additionalConstraints.next([]);
      } else if (this.chosenExample === 'tree') {
        this.requestData.constructorDefinitions.next([{"term":"t","type":"NAryTree","functions":[{"symbol":"nil","arity":0},{"symbol":"c","arity":2}]}])
        this.requestData.statementString.next('depth(t) <= size(t) and 0 <= depth(t) and 0 <= size(t)')
        this.requestData.additionalFunctions.next([{"symbol":"max","arity":2}]);
        this.requestData.functionDefinitions.next([{"name":"depth","arity":1,"inputTypes":["NAryTree"],"outputType":"Int","definition":[{"inputConstructor":{"name":"nil","arity":"0","boundVariables":[]},"conditional":[],"otherwise":{"symbol":"0","parameters":[]}},{"inputConstructor":{"name":"c","arity":"2","boundVariables":["x1","x2"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"1","parameters":[]},{"symbol":"max","parameters":[{"symbol":"depth","parameters":[{"symbol":"x1","parameters":[]}]},{"symbol":"depth","parameters":[{"symbol":"x2","parameters":[]}]}]}]}}]},{"name":"size","arity":1,"inputTypes":["NAryTree"],"outputType":"Int","definition":[{"inputConstructor":{"name":"nil","arity":"0","boundVariables":[]},"conditional":[],"otherwise":{"symbol":"0","parameters":[]}},{"inputConstructor":{"name":"c","arity":"2","boundVariables":["x1","x2"]},"conditional":[],"otherwise":{"symbol":"+","parameters":[{"symbol":"1","parameters":[]},{"symbol":"+","parameters":[{"symbol":"size","parameters":[{"symbol":"x1","parameters":[]}]},{"symbol":"size","parameters":[{"symbol":"x2","parameters":[]}]}]}]}}]},{"name":"max","arity":2,"inputTypes":["Int","Int"],"outputType":"Int","definition":[{"inputVariable":["x1","x2"],"conditional":[{"condition":{"symbol":">","parameters":[{"symbol":"x1","parameters":[]},{"symbol":"x2","parameters":[]}]},"then":{"symbol":"x1","parameters":[]}}],"otherwise":{"symbol":"x2","parameters":[]}}]}])
        this.requestData.additionalConstraints.next([]);
      }

      this.router.navigate(['constructor-definitions'])
    }
  }
}

interface Example {
  name: string;
  value: ExampleValue;
}

type ExampleValue = 'tree' | 'logic';
