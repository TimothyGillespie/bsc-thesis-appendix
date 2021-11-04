import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {
  }

  public obtainedConfig: Config;

  public init(): Promise<void> {
    return this.http.get('/assets/config.json').toPromise().then((config) => {
      this.obtainedConfig = config as Config;
    });
  }
}

export interface Config {
  apiUrl: string;
  imprintLink: string;
  imprintText: string;
}
