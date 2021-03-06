import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {Router} from "@angular/router";
import {ConfirmationService} from "primeng/api";
import {StepDisplayService} from "../../services/step-display/step-display.service";
import {ConfigService} from "../../services/config/config.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  imprintLink: string;
  imprintText: string;

  constructor(
    private router: Router,
    public requestData: RequestDataService,
    private confirmationService: ConfirmationService,
    private stepDisplay: StepDisplayService,
    private config: ConfigService,
  ) {
    this.stepDisplay.showSteps = false;
    this.stepDisplay.activeIndex = 0;
  }

  ngOnInit(): void {
    this.imprintLink = this.config.obtainedConfig.imprintLink;
    this.imprintText = this.config.obtainedConfig.imprintText;
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

  continueButtonHandler() {
    this.router.navigate(['constructor-definitions'])
  }

  usageButtonHandler() {
    this.router.navigate(['usage'])
  }

  loadRequestButtonHandler() {
    this.router.navigate(['load-request'])
  }
}
