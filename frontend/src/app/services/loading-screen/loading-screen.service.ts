import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  loading = new BehaviorSubject<boolean>(false);

  constructor() { }

  start() {
    this.loading.next(true);
  }

  stop() {
    this.loading.next(false);
  }

}
