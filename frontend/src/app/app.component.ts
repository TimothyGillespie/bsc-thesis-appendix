import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {LoadingScreenService} from "./services/loading-screen/loading-screen.service";
import {Subscription} from "rxjs";
import {StepDisplayService} from "./services/step-display/step-display.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  constructor(
    private primeConfig: PrimeNGConfig,
    private loadingScreen: LoadingScreenService,
    public stepDisplay: StepDisplayService,
    ) {
  }

  subscriptions: Subscription[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.stepDisplay.showSteps = true
    this.primeConfig.ripple = true;
    this.subscriptions.push(this.loadingScreen.loading.subscribe((newIsLoading) => {
      this.isLoading =  newIsLoading;
    }));
  }

  ngOnDestroy() {
  }
}
