import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as config from "../../../config.json";
import { Subject, BehaviorSubject } from "rxjs";
import { Subscription } from './subscription';

@Injectable({ providedIn: "root" })
export class SubscriptionService {
  private subscriptions: Subject<
    AWSResponse<Subscription[]>
  > = new BehaviorSubject<AWSResponse<Subscription[]>>({
    Items: [],
    Count: 0,
    ScannedCount: 0
  });

  private userSubscriptions: Subject<
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

  get userSubscriptions$() {
    return this.userSubscriptions.asObservable();
  }

  public updateSubscriptions(awsResponse: AWSResponse<Subscription[]>) {
    this.subscriptions.next(awsResponse);
  }

  public fetchSubscriptions() {
    return this.http.get(`${config.api.invokeUrl}/subscriptions`);
  }

  public updateUserSubscriptions(awsResponse: AWSResponse<Subscription[]>) {
    this.userSubscriptions.next(awsResponse);
  }

  public fetchUserSubscriptions(userId: string) {
    return this.http.get(`${config.api.invokeUrl}/users/${userId}/`);
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
