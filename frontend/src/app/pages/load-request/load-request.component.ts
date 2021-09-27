import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {Router} from "@angular/router";
import {ConfirmationService} from "primeng/api";
import {StepDisplayService} from "../../services/step-display/step-display.service";
import {ValidationHintService} from "../../services/validation-hint/validation-hint.service";
import {isConstructorDefinition, isFunctionTreeNode} from "../../../util/Formulae/type-guards";

@Component({
  selector: 'app-start',
  templateUrl: './load-request.component.html',
  styleUrls: ['./load-request.component.scss']
})
export class LoadRequestComponent implements OnInit {

  requestInput: string = '';

  constructor(
    private router: Router,
    public requestData: RequestDataService,
    private stepDisplay: StepDisplayService,
    private validationHint: ValidationHintService,
  ) {
    this.stepDisplay.showSteps = false;
    this.stepDisplay.activeIndex = 0;
  }

  ngOnInit(): void {
  }

  loadRequestButtonHandler() {
    console.log(this.validateRequest(this.requestInput, true))
  }

  validateRequest(request: string, sendValidationHints: boolean = false): boolean {
    let requestObject
    try {
      requestObject = JSON.parse(request)
    } catch (e) {
      if(sendValidationHints) this.validationHint.sendHint('The given request does not appear to be in json format');
      return false;
    }

    if(!requestObject.statementTree) {
      if(sendValidationHints) this.validationHint.sendHint('statementTree is not defined on the request.');
      return false;
    }

    if(!isFunctionTreeNode(requestObject.statementTree)) {
      if(sendValidationHints) this.validationHint.sendHint('statementTree is not in a valid format.');
      return false;
    }

    if(!requestObject.constructorDefinitions) {
      if(sendValidationHints) this.validationHint.sendHint('constructorDefinitions is not defined on the request.');
      return false;
    }

    if(requestObject.constructorDefinitions.every(isConstructorDefinition)) {
      if(sendValidationHints) this.validationHint.sendHint('constructorDefinitions is not in a valid format.');
      return false;
    }

    return true;
  }

  loadRequest(request: string) {

  }

  clearButtonHandler() {
    this.requestInput = ''
  }
}
