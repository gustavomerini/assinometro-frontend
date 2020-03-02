import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import * as Canvas from "../canvas/canvas";

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

    // let chart2 = new Canvas.Chart("chartContainer2", {
    //   theme: "light2",
    //   animationEnabled: true,
    //   colorSet: "customColorSet6",
    //   fontFamily: {
    //     fontFamily: "Metropolis"
    //   },
    //   data: [
    //     {
    //       type: "doughnut",
    //       dataPoints: [
    //         { y: 15, label: "Netflix" },
    //         { y: 145, label: "Vivo" },
    //         { y: 55, label: "Oi" },
    //         { y: 80, label: "Sky" },
    //         { y: 15, label: "Spotify" }
    //       ]
    //     }
    //   ]
    // });
    // chart2.render();
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
