import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as config from "../../../config.json";
import { Subscription, Subject, BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class SubscriptionService {
  private subscriptions: Subject<
    AWSResponse<Subscription[]>
  > = new BehaviorSubject<AWSResponse<Subscription[]>>({
    Items: [],
    Count: 0,
    ScannedCount: 0
  });

  constructor(private http: HttpClient) {}

  get subscriptions$() {
    return this.subscriptions.asObservable();
  }

  public updateSubscriptions(subs: AWSResponse<Subscription[]>) {
    this.subscriptions.next(subs);
  }

  public fetchSubscriptions() {
    return this.http.get(`${config.api.invokeUrl}/subscriptions`);
  }

  public getSubscriptions() {
    return this.subscriptions;
  }

  public addUserSubscriptions(subscriptions: Subscription[], userId: string) {
    return this.http.post(
      `${config.api.invokeUrl}/users/${userId}/`,
      {subscriptions}
    );
  }
}

export interface AWSResponse<T> {
  Items: T;
  Count: number;
  ScannedCount: number;
}
