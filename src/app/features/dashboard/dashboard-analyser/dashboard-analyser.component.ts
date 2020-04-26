import { Component, OnInit } from "@angular/core";
import {
  SubscriptionService,
  AWSResponse,
} from "src/app/core/subscription/subscription.service";
import { Subscription } from "src/app/core/subscription/subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { TimelineOption } from "src/app/shared/components/timeline/timeline.component";

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

  constructor(
    private subsService: SubscriptionService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.subsService.userSubscriptions$.subscribe(
        (subs: AWSResponse<Subscription[]>) => {
          this.subscriptions = subs.Items;
          this.isLoading = false;
        }
      );
    });
  }

  public onCancel() {
    this.router.navigate(["dashboard/summary"]);
  }

  public goForward() {
    this.currentIndex++;
    this.isLoadingResults = true;
    setTimeout(() => {
      this.isLoadingResults = false;
    }, 4000);
  }
}
