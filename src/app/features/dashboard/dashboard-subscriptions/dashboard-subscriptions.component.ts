import { Component, OnInit } from "@angular/core";
import { subscriptions } from "src/app/core/subscription/subscriptions";
import { SubscriptionService } from "src/app/core/subscription/subscription.service";

@Component({
  selector: "app-dashboard-subscriptions",
  templateUrl: "./dashboard-subscriptions.component.html",
  styleUrls: ["./dashboard-subscriptions.component.scss"]
})
export class DashboardSubscriptionsComponent implements OnInit {
  public subscriptions = subscriptions;
  constructor(private subsService: SubscriptionService) {}

  ngOnInit(): void {
    this.subsService.getSubscriptions().subscribe(
      (response: any) => console.log(response.data),
      error => console.log(error)
    );
  }
}
