import { Component, OnInit } from "@angular/core";
import {
  SubscriptionService,
  AWSResponse,
} from "src/app/core/subscription/subscription.service";
import { Subscription } from "src/app/core/subscription/subscription";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AnalyserService } from "src/app/core/services/analyser/analyser.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";

@Component({
  selector: "app-dashboard-analyser",
  templateUrl: "./dashboard-analyser.component.html",
  styleUrls: ["./dashboard-analyser.component.scss"],
})
export class DashboardAnalyserComponent implements OnInit {
  public subscriptions: Subscription[];
  public currentIndex = 0;
  public isLoading = true;
  public isLoadingResults = false;
  public results: Subscription[];
  public alertRole = "alert-danger";
  public message = "";
  public id = "";

  constructor(
    private subsService: SubscriptionService,
    private router: Router,
    private analyserService: AnalyserService,
    private authService: AuthenticationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.authService.getUserInfo().then((response) => {
      this.id = response.username;
    });
    this.subsService.userSubscriptions$.subscribe(
      (subs: AWSResponse<Subscription[]>) => {
        this.subscriptions = subs.Items;
        this.isLoading = false;
      }
    );
  }

  public onCancel() {
    this.closeAlert();
    this.router.navigate(["dashboard/summary"]);
  }

  public closeAlert() {
    this.message = "";
    this.alertRole = "";
  }

  public analyseSubs(subscriptions: Subscription[]) {
    this.closeAlert();
    const validSubs = subscriptions.filter((sub) => {
      const nullProps = Object.keys(sub.ext).filter(
        (key) => sub.ext[key] === null || sub.ext[key] === undefined
      );
      return nullProps.length <= 1;
    });
    if (validSubs.length === 0) {
      this.message = this.translate.instant("error_fill_subs_info");
      this.alertRole = "alert-danger";
      return;
    }
    this.isLoadingResults = true;
    this.currentIndex = 2;
    this.analyserService.analyseUserSubscriptions(this.id, validSubs).subscribe(
      (response: any) => {
        this.results = response.subscriptions;
        this.currentIndex = 1;
        this.isLoadingResults = false;
      },
      (error) => {
        this.isLoadingResults = false;
        console.error(error);
      }
    );
  }
}
