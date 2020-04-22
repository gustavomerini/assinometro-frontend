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
  public isLoading = false;
  public timelineIndex = 0;
  public timelineOptions: TimelineOption[] = [
    {
      label: this.translate.instant("subscription_data"),
      state: "circle",
    },
    {
      label: this.translate.instant("analyzing"),
      state: "circle",
    },
    {
      label: this.translate.instant("results"),
      state: "circle",
    },
  ];

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
        }
      );
    });
  }

  public onCancel() {
    this.router.navigate(["dashboard/summary"]);
  }

  public goForward() {
    if (this.timelineIndex === 2) {
      return;
    }
    this.timelineOptions[this.timelineIndex].state = "success-standard";
    this.timelineIndex = this.timelineIndex + 1;
  }
}
