import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ValidationHintService {

  constructor(
    private messageService: MessageService,
  ) {}

  sendHint(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Input Error',
      detail: message,
    })
  }


  sendGeneralHint() {
    this.sendHint('Please check the inputs. Missing values are marked with a red border and hints are given in red font.')
  }
}
