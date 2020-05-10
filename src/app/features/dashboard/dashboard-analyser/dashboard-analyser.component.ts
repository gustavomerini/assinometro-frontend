import { Component, OnInit } from "@angular/core";
import {
  SubscriptionService,
  AWSResponse,
} from "src/app/core/subscription/subscription.service";
import { Subscription } from "src/app/core/subscription/subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { TimelineOption } from "src/app/shared/components/timeline/timeline.component";
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
    this.router.navigate(["dashboard/summary"]);
  }

  public analyseSubs(subscriptions: Subscription[]) {
    this.isLoadingResults = true;
    this.currentIndex = 2;
    const validSubs = subscriptions.filter((sub) => {
      return Object.keys(sub.ext).filter((key) => !sub.ext[key]).length === 0;
    });
    console.log({ validSubs });
    this.analyserService
      .analyseUserSubscriptions(this.id, validSubs)
      .subscribe(
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
