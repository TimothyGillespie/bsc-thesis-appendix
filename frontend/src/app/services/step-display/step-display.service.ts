import {Injectable} from "@angular/core";
import {RequestDataService} from "../request-data-service/request-data.service";
import {Router} from "@angular/router";
import {ValidationHintService} from "../validation-hint/validation-hint.service";

@Injectable({
  providedIn: 'root'
})
export class StepDisplayService {

  constructor(
    private requestData: RequestDataService,
    private router: Router,
    private validationHint: ValidationHintService,
  ) {}

  showSteps = false;
  stepItems = [
    {
      label: 'Constructor Definitions',
      link: 'constructor-definitions',
      condition: () => true},
    {
      label: 'Statement and Additional Functions',
      link: 'statement',
      condition: () => this.requestData.statementString.value != undefined && this.requestData.additionalFunctions != undefined
    },
    {
      label: 'Function Definitions',
      link: 'function-definitions',
      condition: () => this.requestData.functionDefinitions.value != undefined
    },
    {
      label: 'Additional Constraints',
      link: 'additional-constraints',
      condition: () => this.requestData.additionalConstraints.value != undefined
    },
    {
      label: 'Result',
      link: 'finish',
      condition: () => this.requestData.additionalConstraints.value != undefined
    },
  ]

  activeIndex = 0;

  handleActiveIndexChange(newIndex: number) {
    const step = this.stepItems[newIndex]
    if(step.condition()) {
      this.router.navigate([step.link])
    } else {
      this.validationHint.sendHint('You cannot navigate here until you reached this part of this formular.')
    }
  }
}
