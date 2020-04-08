import { Component, OnInit } from "@angular/core";
import { SubscriptionService } from "src/app/core/subscription/subscription.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Subscription } from "src/app/core/subscription/subscription";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-dashboard-subscriptions",
  templateUrl: "./dashboard-subscriptions.component.html",
  styleUrls: ["./dashboard-subscriptions.component.scss"],
})
export class DashboardSubscriptionsComponent implements OnInit {
  public subscriptions: Subscription[];
  public newUser = false;
  public message = "";
  public confirmedSubs = [];
  public alertRole = "";
  public showModal = false;
  public showSubscriptionPicker = true;
  public footerLabel = this.translate.instant("manage_action");

  constructor(
    private subsService: SubscriptionService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.newUser) {
        this.newUser = params.newUser;
        this.message = this.translate.instant("subscription_picker_message");
      }
    });
    this.subsService.subscriptions$.subscribe(
      (subs) => (this.subscriptions = [...subs.Items])
    );
  }

  public onConfirmSubs(subs: Subscription[]) {
    this.confirmedSubs = [...this.confirmedSubs, ...subs];
    this.showSubscriptionPicker = false;
    this.message = this.translate.instant("edit_values_message");
  }

  public saveSubscriptions(subs: Subscription[]) {
    console.log("saving...", subs);
  }

  public async tetse() {
    try {
      const response = await this.authService.getUserInfo();
      this.subsService
        .addUserSubscriptions(this.confirmedSubs, response.username)
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
    } catch (error) {
      console.error(error);
    }
  }

  public goBack() {
    this.showSubscriptionPicker = true;
  }

  public toggleModal() {
    this.showModal = !this.showModal;
  }

  public updateSub(sub: Subscription) {
    console.log(sub);
  }

  public createSubscription(subscription: Subscription) {
    this.confirmedSubs = [...this.confirmedSubs, subscription];
    this.showModal = false;
  }

  public closeAlert() {
    this.message = "";
    this.alertRole = "";
  }
}
