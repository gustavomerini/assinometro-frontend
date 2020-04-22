import { Component, OnInit } from "@angular/core";
import {
  SubscriptionService,
  AWSResponse,
} from "src/app/core/subscription/subscription.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Subscription } from "src/app/core/subscription/subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { calculateActualMonthCost } from "src/app/shared/utils/utils";

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
  public pricesHistory = [];
  public alertRole = "";
  public showModal = false;
  public isLoading = false;
  public showSubscriptionPicker = true;
  public footerLabel = this.translate.instant("manage_action");

  constructor(
    private subsService: SubscriptionService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (this.confirmedSubs.length === 0 && params.newUser) {
        this.newUser = params.newUser;
        this.message = this.newUser
          ? this.translate.instant("subscription_picker_message")
          : null;
      } else {
        this.showSubscriptionPicker = false;
        this.subsService.userSubscriptions$.subscribe(
          (subs: AWSResponse<Subscription[]>) => {
            this.confirmedSubs = subs.Items;
            this.pricesHistory = subs.PriceHistory;
          }
        );
      }
    });
    this.subsService.subscriptions$.subscribe(
      (subs) => (this.subscriptions = [...subs.Items])
    );
  }

  public onConfirmSubs(subs: Subscription[]) {
    this.confirmedSubs = [...this.confirmedSubs, ...subs];
    this.showSubscriptionPicker = false;
    this.message = this.newUser
      ? this.translate.instant("edit_values_message")
      : null;
  }

  public async saveSubscriptions(subs: Subscription[]) {
    try {
      this.isLoading = true;
      subs = subs.map((subscription) => ({
        ...subscription,
        isEditing: false,
      }));
      const response = await this.authService.getUserInfo();
      this.subsService
        .updateUserSubscriptions(response.username, subs)
        .subscribe(
          () => {
            const today = new Date();
            this.pricesHistory.push({
              month: today.getMonth() + 1,
              year: today.getFullYear(),
              price: calculateActualMonthCost(subs),
            });
            this.subsService.dispatchUserSubscriptions({
              Items: subs,
              PriceHistory: this.pricesHistory,
              Count: subs.length,
              ScannedCount: subs.length,
            });
            this.isLoading = false;
            this.router.navigate(["dashboard/summary"]);
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
    this.message = this.newUser
      ? this.translate.instant("subscription_picker_message")
      : null;
  }

  public onCancel() {
    this.router.navigate(['dashboard/summary'])
  }

  public toggleModal() {
    this.showModal = !this.showModal;
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
