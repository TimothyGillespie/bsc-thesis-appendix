import { Component, OnInit } from '@angular/core';
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {Router} from "@angular/router";
import {ConfirmationService} from "primeng/api";
import {StepDisplayService} from "../../services/step-display/step-display.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(
    private router: Router,
    private requestData: RequestDataService,
    private confirmationService: ConfirmationService,
    private stepDisplay: StepDisplayService,
  ) {
    this.stepDisplay.showSteps = false;
    this.stepDisplay.activeIndex = 0;
  }

  ngOnInit(): void {
  }

  startNewProcess() {
    this.requestData.reset();
    this.router.navigate(['constructor-definitions']);
  }

  startButtonHandler(event: Event) {
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
}
