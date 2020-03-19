import { Injectable } from "@angular/core";
import { Subscription } from "./subscription";
import { HttpClient } from "@angular/common/http";
import * as config from "../../../config.json";

@Injectable({ providedIn: "root" })
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  public getSubscriptions() {
    return this.http.get(`${config.api.invokeUrl}/subscriptions`);
  }

}
