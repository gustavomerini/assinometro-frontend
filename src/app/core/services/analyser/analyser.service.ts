import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as config from "../../../../config.json";

@Injectable({ providedIn: "root" })
export class AnalyserService {
  constructor(private http: HttpClient) {}

  public analyseUserSubscriptions(id, subscriptions) {
    return this.http.post(`${config.api.invokeUrl}/analyse`, {
      id,
      subscriptions,
    });
  }
}
