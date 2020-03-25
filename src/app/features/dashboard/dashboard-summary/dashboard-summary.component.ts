import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import * as Canvas from "../canvas/canvas";
import {
  SubscriptionService,
  AWSResponse
} from "src/app/core/subscription/subscription.service";
import { Subscription } from "src/app/core/subscription/subscription";

@Component({
  selector: "app-dashboard-summary",
  styleUrls: ["dashboard-summary.component.scss"],
  templateUrl: "dashboard-summary.component.html"
})
export class DashboardSummaryComponent implements OnInit {
  public totalSubsFooter = {
    label: this.translate.instant("manage_action"),
    action: () => this.router.navigate(["/subscriptions"])
  };

  public subscriptions: Subscription[];
  public chartTypes = ["area", "line", "column"];
  public counter = 0;
  public priceInfo = {
    month: 0,
    year: 0,
    week: 0
  };
  ghosts = [];
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
        this.subscriptions = subs.Items;
        this.ghosts = new Array(6);
        const monthPrice =
          Math.round(
            this.subscriptions.reduce(
              (previous, current) => previous + current.price,
              0
            ) * 100
          ) / 100;
        this.priceInfo = {
          month: monthPrice,
          year: Math.round(monthPrice * 12 * 100) / 100,
          week: Math.round((monthPrice / 4) * 100) / 100
        };
        this.ghosts = [];
        this.loadCanvas();
      }
    );
  }

  loadCanvas() {
    const type = this.chartTypes[this.counter];
    this.counter >= 2 ? (this.counter = 0) : this.counter++;
    this.isTotalSubsLoaded = true;
    this.cdr.detectChanges();
    Canvas.addColorSet("customColorSet6", [
      "#0065AB",
      "#C1CDD4",
      "#49AFD9",
      "#798893",
      "#A6D8E7",
      "#25333D"
    ]);

    let chart = new Canvas.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      dataPointMaxWidth: 60,
      colorSet: "customColorSet6",
      fontFamily: {
        fontFamily: "Metropolis"
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { y: this.priceInfo.month, label: "April" },
            { y: this.priceInfo.month, label: "May" },
            { y: this.priceInfo.month, label: "June" },
            { y: this.priceInfo.month, label: "July" },
            { y: this.priceInfo.month, label: "August" }
          ]
        }
      ]
    });

    chart.render();
  }
}
