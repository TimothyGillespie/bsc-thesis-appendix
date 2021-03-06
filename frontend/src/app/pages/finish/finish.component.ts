import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {ApiQueryService, ProveRequest, ProveResponse} from "../../services/api-query/api-query.service";
import {LoadingScreenService} from "../../services/loading-screen/loading-screen.service";
import toClipBoard from "../../../util/toClipBoard";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {StepDisplayService} from "../../services/step-display/step-display.service";
import convertKeysToSnakeCase from "../../../util/convertKeysToSnakeCase";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  @ViewChild("requestDisplay") requestDisplay: HTMLTextAreaElement;

  constructor(
    private requestData: RequestDataService,
    private api: ApiQueryService,
    private loadingScreen: LoadingScreenService,
    private messageService: MessageService,
    private stepDisplay: StepDisplayService,
    public router: Router,
    private confirmationService: ConfirmationService,
  ) {
    this.stepDisplay.showSteps = true;
    this.stepDisplay.activeIndex = 4;
  }

  names: string[] = [
    'Function Definitions',
    'Inductive Hypothesis',
    'Additional Constraints',
    'Inductive Basis',
    'Inductive Step',
  ]

  result: ProveResponse;
  error: boolean = false;
  sentRequest?: ProveRequest = null;

  ngOnInit(): void {
    this.loadingScreen.start();

    const request = this.requestData.obtainRequest();

    this.sentRequest = convertKeysToSnakeCase(request)
    this.api.prove(request).then((response) => {
      this.result = response;
      this.loadingScreen.stop();
    }).catch((error) => {
      this.error = true
      this.loadingScreen.stop();
    });

  }

  getResponseKeys() {
    return Object.keys(this.result.satisfiability)
  }

  printHumanReadable(): string {
    let text = this.result.counterModel?.humanReadable.typing
    text += "\n\n"
    text += this.result.counterModel?.humanReadable.constantDefinitions.replace("()", "")
    text += "\n\n"
    text += this.result.counterModel?.humanReadable.functionDefinitions.reduce((previousText, nextText) => previousText + "\n\n" + nextText.replace("()", ""))

    return text
  }

  copyRequest() {
    toClipBoard(JSON.stringify(this.sentRequest, null, "\t"))
    this.messageService.add({
      severity: 'success',
      summary:'Success',
      detail: 'The sent request was successfully copied to your clipboard!'
    })
  }

  startNewProcess() {
    this.requestData.reset();
    this.router.navigate(['constructor-definitions']);
  }

  startNewButtonHandler(event: Event) {
    if(!this.requestData.isPristine()) {
      this.confirmationService.confirm({
        target: event.target,
        key: 'confirmPopup',
        message: 'You currently have an on-going process which will be deleted if you continue.',
        acceptLabel: 'Delete and Continue',
        rejectLabel: 'Cancel',
        acceptButtonStyleClass: 'p-button-danger',
        accept: () => this.startNewProcess(),
      })
    } else {
      this.startNewProcess()
    }
  }

  convertForDataTest(name: string): string {
    return 'sat-' + name.toLowerCase().replace(' ', '-');
  }
}
