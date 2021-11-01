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
}

interface Example {
  name: string;
  value: ExampleValue;
}

type ExampleValue = 'tree' | 'logic';
