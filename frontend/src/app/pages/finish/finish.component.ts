import { Component, OnInit } from '@angular/core';
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {HttpClient} from "@angular/common/http";
import {ApiQueryService, ProveRequest, ProveResponse} from "../../services/api-query/api-query.service";
import {LoadingScreenService} from "../../services/loading-screen/loading-screen.service";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  constructor(
    private requestData: RequestDataService,
    private api: ApiQueryService,
    private loadingScreen: LoadingScreenService,
  ) { }

  result: any;

  ngOnInit(): void {
    this.loadingScreen.start();

    const request = this.requestData.obtainRequest();
    this.api.prove(request).then((response) => {
        this.result = response;
    }).catch((error) => {
      this.result = error;
    });

    this.loadingScreen.stop();
  }

}
