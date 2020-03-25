import { Component, OnInit } from "@angular/core";
import { SubscriptionService } from "src/app/core/subscription/subscription.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Subscription } from 'src/app/core/subscription/subscription';

@Component({
  selector: "app-dashboard-subscriptions",
  templateUrl: "./dashboard-subscriptions.component.html",
  styleUrls: ["./dashboard-subscriptions.component.scss"]
})
export class DashboardSubscriptionsComponent implements OnInit {
  public subscriptions: Subscription[];
  constructor(
    private subsService: SubscriptionService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.subsService.subscriptions$.subscribe(
      subs => (this.subscriptions = subs.Items)
    );
  }

  public async onConfirmSubs(subs: Subscription[]) {
    try {
      const response = await this.authService.getUserInfo();
      this.subsService.addUserSubscriptions(subs, response.username).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
