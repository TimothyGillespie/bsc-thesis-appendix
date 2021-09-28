import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {ConfirmationService} from "primeng/api";
import {StepDisplayService} from "../../services/step-display/step-display.service";

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit {

  constructor(
    private router: Router,
    public requestData: RequestDataService,
    private confirmationService: ConfirmationService,
    private stepDisplay: StepDisplayService,
  ) {
    this.stepDisplay.showSteps = false;
    this.stepDisplay.activeIndex = 0;
  }

  ngOnInit(): void {
  }

}
