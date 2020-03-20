import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import * as Canvas from "../canvas/canvas";
import { Subscription } from "rxjs";
import { SubscriptionService, AWSResponse } from "src/app/core/subscription/subscription.service";

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

  public isTotalSubsLoaded = false;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private subsService: SubscriptionService
  ) {}

  ngOnInit() {
    this.subsService.subscriptions$.subscribe(
      (subs: AWSResponse<Subscription[]>) => (this.subscriptions = subs.Items)
    );
    setTimeout(() => this.loadCanvas(), 1500);
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
            { y: 250, label: "April" },
            { y: 260, label: "May" },
            { y: 290, label: "June" },
            { y: 290, label: "July" },
            { y: 290, label: "August" }
          ]
        }
      ]
    });

    chart.render();
  }
}
