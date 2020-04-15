import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import * as Canvas from "../canvas/canvas";
import {
  SubscriptionService,
  AWSResponse,
} from "src/app/core/subscription/subscription.service";
import { Subscription } from "src/app/core/subscription/subscription";
import { PriceHistory } from "src/app/core/price-history/price-history";
import { calculatePeriods } from "src/app/shared/utils/utils";

@Component({
  selector: "app-dashboard-summary",
  styleUrls: ["dashboard-summary.component.scss"],
  templateUrl: "dashboard-summary.component.html",
})
export class DashboardSummaryComponent implements OnInit {
  public totalSubsFooter = {
    label: this.translate.instant("manage_action"),
    action: () => this.router.navigate(["dashboard/subscriptions"]),
  };

  public subscriptions: Subscription[];
  public pricesHistory: PriceHistory[];
  public actualMonthPrice: PriceHistory;
  public priceInfo: any;
  public chartTypes = ["area", "line", "column"];
  public counter = 0;
  private canvasData: any;
  public showEmptyState = false;
  public isTotalSubsLoaded = false;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private subsService: SubscriptionService
  ) {}

  ngOnInit() {
    this.subsService.userSubscriptions$.subscribe(
      (subs: AWSResponse<Subscription[]>) => {
        if (!this.hasSubscriptions(subs)) {
          this.showEmptyState = true;
          return;
        }
        this.showEmptyState = false;
        this.subscriptions = subs.Items;
        this.pricesHistory = subs.PriceHistory;
        if (this.pricesHistory && this.pricesHistory.length > 0) {
          this.priceInfo = calculatePeriods([...this.pricesHistory]);
          this.canvasData = this.calculateMonthsCost([...this.pricesHistory]);
        }

        this.isTotalSubsLoaded = subs.Count > 0 || subs.Items.length > 0;

        if (this.isTotalSubsLoaded) {
          this.loadCanvas();
        }
      }
    );
  }

  redirectToSubscriptions() {
    this.router.navigate(["dashboard/subscriptions"], {
      queryParams: { newUser: true },
    });
  }

  private hasSubscriptions(subs: AWSResponse<Subscription[]>) {
    const obj = subs.Items[0];
    return (subs && obj && Object.keys(obj).length > 0) || subs.Count === -1;
  }

  private calculateMonthsCost(pricesHistory: PriceHistory[]) {
    const filteredPrices = pricesHistory
      .reverse()
      .filter(
        (thing, index, self) =>
          self.findIndex(
            (t) => t.month === thing.month && t.year === thing.year
          ) === index
      );
    return filteredPrices.map((history) => {
      return {
        y: history.price,
        label: this.translate.instant(`month_${history.month}`),
      };
    });
  }

  private loadCanvas() {
    const type = this.chartTypes[this.counter];
    this.counter >= 2 ? (this.counter = 0) : this.counter++;
    this.cdr.detectChanges();
    Canvas.addColorSet("customColorSet6", [
      "#0065AB",
      "#C1CDD4",
      "#49AFD9",
      "#798893",
      "#A6D8E7",
      "#25333D",
    ]);

    let chart = new Canvas.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      dataPointMaxWidth: 60,
      colorSet: "customColorSet6",
      fontFamily: {
        fontFamily: "Metropolis",
      },
      data: [
        {
          type: "column",
          dataPoints: this.canvasData,
        },
      ],
    });

    chart.render();
  }
}
