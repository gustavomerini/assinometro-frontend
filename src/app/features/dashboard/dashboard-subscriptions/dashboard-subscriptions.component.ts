import { Component, OnInit } from "@angular/core";
import { SubscriptionService } from "src/app/core/subscription/subscription.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-dashboard-subscriptions",
  templateUrl: "./dashboard-subscriptions.component.html",
  styleUrls: ["./dashboard-subscriptions.component.scss"]
})
export class DashboardSubscriptionsComponent implements OnInit {
  public subscriptions: Subscription[];
  constructor(private subsService: SubscriptionService) {}

  ngOnInit(): void {
    this.subsService.getSubscriptions().subscribe(
      (response: any) => {
        this.subscriptions = response.Items;
        console.log({a: response.Items});
      },
      error => console.log(error)
    );
  }
}
