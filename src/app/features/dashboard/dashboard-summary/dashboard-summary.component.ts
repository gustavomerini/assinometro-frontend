import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import * as Chartist from "chartist";

@Component({
  selector: "app-dashboard-summary",
  styleUrls: ["dashboard-summary.component.scss"],
  templateUrl: "dashboard-summary.component.html"
})
export class DashboardSummaryComponent implements OnInit {
  public totalSubsFooter = {
    label: this.translate.instant("action_manage"),
    action: () => this.router.navigate(["/subscriptions"])
  };

  chartTypes = ["area", "line", "column"];
  counter = 0;

  public subscriptions = [
    {
      name: "Netflix",
      price: "R$ 37,40"
    },
    {
      name: "Amazon",
      price: "R$ 150,00"
    },
    {
      name: "Spotify",
      price: "R$ 15,00"
    },
    {
      name: "Apple",
      price: "R$ 30,00"
    },
    {
      name: "Audible",
      price: "R$ 29,99"
    },
    {
      name: "Blizzard",
      price: "R$ 27,90"
    }
  ];
  public isTotalSubsLoaded = false;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => this.loadCanvas(), 1500);
  }

  loadCanvas() {
    this.isTotalSubsLoaded = true;
    this.cdr.detectChanges();
    const data = {
      labels: ["Mai", "Jun", "Jul", "Aug"],
        series: [
        [5, 4, 3, 7],
      ]
    };

    const options = {
      seriesBarDistance: 15
    };

    const responsiveOptions = [
      ["screen and (min-width: 641px) and (max-width: 1024px)", {
        seriesBarDistance: 10,
        axisX: {
          labelInterpolationFnc: (value) => {
            return value;
          }
        }
      }],
      ["screen and (max-width: 640px)", {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: (value) => {
            return value[0];
          }
        }
      }]
    ];

    return new Chartist.Bar(".ct-chart", data, options, responsiveOptions);
  }
}
